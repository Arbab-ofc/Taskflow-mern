const { clone, createMemoryModel } = require("./memoryUtils");

module.exports = createMemoryModel({
  collectionName: "users",
  selectTransform: (doc, fields) => {
    if (!doc) return doc;
    if (!fields) return doc;

    const fieldsText = Array.isArray(fields) ? fields.join(" ") : String(fields);
    if (fieldsText.includes("-password")) {
      const nextDoc = clone(doc);
      delete nextDoc.password;
      return nextDoc;
    }

    return doc;
  },
});
