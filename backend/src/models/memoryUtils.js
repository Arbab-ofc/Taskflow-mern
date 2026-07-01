const { createId, store } = require("./memoryStore");

const clone = (value) => JSON.parse(JSON.stringify(value));

const isDateLike = (value) => value instanceof Date || typeof value === "string";

const normalizeComparable = (value) => {
  if (value instanceof Date) return value.toISOString();
  return value;
};

const getFieldValue = (doc, path) => path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), doc);

const testRegex = (value, regex, options = "") => {
  if (typeof value !== "string") return false;
  return new RegExp(regex, options).test(value);
};

const matchesQuery = (doc, query = {}) => {
  return Object.entries(query).every(([key, expected]) => {
    if (key === "$or") {
      return expected.some((clause) => matchesQuery(doc, clause));
    }

    const actual = getFieldValue(doc, key);

    if (expected && typeof expected === "object" && !Array.isArray(expected)) {
      if (Object.prototype.hasOwnProperty.call(expected, "$ne")) {
        return normalizeComparable(actual) !== normalizeComparable(expected.$ne);
      }

      if (Object.prototype.hasOwnProperty.call(expected, "$regex")) {
        return testRegex(actual, expected.$regex, expected.$options);
      }
    }

    if (isDateLike(actual) || isDateLike(expected)) {
      return normalizeComparable(actual) === normalizeComparable(expected);
    }

    return normalizeComparable(actual) === normalizeComparable(expected);
  });
};

const sortDocuments = (docs, sortSpec = {}) => {
  const entries = Object.entries(sortSpec);
  if (entries.length === 0) return docs;

  return [...docs].sort((left, right) => {
    for (const [field, direction] of entries) {
      const leftValue = getFieldValue(left, field);
      const rightValue = getFieldValue(right, field);

      if (leftValue === rightValue) continue;

      const leftComparable = normalizeComparable(leftValue);
      const rightComparable = normalizeComparable(rightValue);

      if (leftComparable === undefined || leftComparable === null) return 1 * direction;
      if (rightComparable === undefined || rightComparable === null) return -1 * direction;

      if (leftComparable < rightComparable) return -1 * direction;
      if (leftComparable > rightComparable) return 1 * direction;
    }

    return 0;
  });
};

const computeExpr = (doc, expr) => {
  if (typeof expr === "number") return expr;
  if (expr && typeof expr === "object") {
    if (Object.prototype.hasOwnProperty.call(expr, "$eq")) {
      const [left, right] = expr.$eq;
      return computeExpr(doc, left) === computeExpr(doc, right);
    }

    if (Object.prototype.hasOwnProperty.call(expr, "$cond")) {
      const [condition, truthy, falsy] = expr.$cond;
      return computeExpr(doc, condition) ? computeExpr(doc, truthy) : computeExpr(doc, falsy);
    }

    if (Object.prototype.hasOwnProperty.call(expr, "$switch")) {
      const branches = expr.$switch.branches || [];
      for (const branch of branches) {
        if (computeExpr(doc, branch.case)) {
          return computeExpr(doc, branch.then);
        }
      }
      return computeExpr(doc, expr.$switch.default);
    }

    if (typeof expr === "string" && expr.startsWith("$")) {
      return getFieldValue(doc, expr.slice(1));
    }
  }

  if (typeof expr === "string" && expr.startsWith("$")) {
    return getFieldValue(doc, expr.slice(1));
  }

  return expr;
};

const aggregateDocuments = (docs, pipeline = []) => {
  let current = [...docs];

  for (const stage of pipeline) {
    if (stage.$match) {
      current = current.filter((doc) => matchesQuery(doc, stage.$match));
      continue;
    }

    if (stage.$addFields) {
      current = current.map((doc) => ({
        ...doc,
        ...Object.fromEntries(
          Object.entries(stage.$addFields).map(([field, expr]) => [field, computeExpr(doc, expr)])
        ),
      }));
      continue;
    }

    if (stage.$sort) {
      current = sortDocuments(current, stage.$sort);
      continue;
    }

    if (stage.$skip) {
      current = current.slice(stage.$skip);
      continue;
    }

    if (stage.$limit) {
      current = current.slice(0, stage.$limit);
      continue;
    }

    if (stage.$project) {
      current = current.map((doc) => {
        const projected = { ...doc };
        for (const [field, include] of Object.entries(stage.$project)) {
          if (!include) delete projected[field];
        }
        return projected;
      });
      continue;
    }

    if (stage.$group) {
      const grouped = { _id: stage.$group._id ?? null };
      for (const [field, accumulator] of Object.entries(stage.$group)) {
        if (field === "_id") continue;

        if (accumulator && typeof accumulator === "object" && Object.prototype.hasOwnProperty.call(accumulator, "$sum")) {
          grouped[field] = current.reduce((total, doc) => total + Number(computeExpr(doc, accumulator.$sum) || 0), 0);
        }
      }
      current = [grouped];
      continue;
    }
  }

  return current;
};

class MemoryDocument {
  constructor(collectionName, data, store) {
    Object.assign(this, data);
    Object.defineProperty(this, "_collectionName", { value: collectionName, enumerable: false });
    Object.defineProperty(this, "_store", { value: store, enumerable: false });
  }

  async save() {
    const collection = this._store[this._collectionName];
    const index = collection.findIndex((item) => item._id === this._id);
    if (index >= 0) {
      collection[index] = this;
    } else {
      collection.push(this);
    }
    return this;
  }
}

const createMemoryModel = ({ collectionName, defaults = {}, onCreate, selectTransform }) => {
  const makeDoc = (data) =>
    new MemoryDocument(collectionName, { ...defaults, ...data }, store);

  const Model = {
    async create(data) {
      const doc = makeDoc({
        _id: createId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      });

      if (onCreate) onCreate(doc);
      store[collectionName].push(doc);
      return doc;
    },

    findOne(query = {}) {
      const doc = store[collectionName].find((item) => matchesQuery(item, query)) || null;
      return createQueryResult(doc);
    },

    findById(id) {
      return this.findOne({ _id: id });
    },

    find(query = {}) {
      const docs = store[collectionName].filter((item) => matchesQuery(item, query));
      return createQueryList(docs);
    },

    countDocuments(query = {}) {
      return Promise.resolve(store[collectionName].filter((item) => matchesQuery(item, query)).length);
    },

    aggregate(pipeline = []) {
      return Promise.resolve(aggregateDocuments(store[collectionName], pipeline));
    },

    deleteMany() {
      store[collectionName] = [];
      return Promise.resolve();
    },
  };

  const createQueryResult = (doc) => {
    const result = {
      select(fields) {
        if (selectTransform) {
          return createQueryResult(selectTransform(doc, fields));
        }
        return result;
      },
      then(resolve, reject) {
        return Promise.resolve(doc).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(doc).catch(reject);
      },
      exec() {
        return Promise.resolve(doc);
      },
    };

    return result;
  };

  const createQueryList = (docs) => {
    let workingSet = [...docs];
    const result = {
      sort(spec) {
        workingSet = sortDocuments(workingSet, spec);
        return result;
      },
      skip(count) {
        workingSet = workingSet.slice(count);
        return result;
      },
      limit(count) {
        workingSet = workingSet.slice(0, count);
        return result;
      },
      then(resolve, reject) {
        return Promise.resolve(workingSet).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(workingSet).catch(reject);
      },
      exec() {
        return Promise.resolve(workingSet);
      },
    };

    return result;
  };

  Model._store = store;
  Model._collectionName = collectionName;
  Model._makeDoc = makeDoc;
  return Model;
};

module.exports = {
  clone,
  createMemoryModel,
  matchesQuery,
  aggregateDocuments,
  sortDocuments,
  MemoryDocument,
};
