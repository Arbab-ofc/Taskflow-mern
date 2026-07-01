const { resetStore } = require("../../src/models/memoryStore");

const connectTestDb = async () => {
  resetStore();
};

const clearTestDb = async () => {
  resetStore();
};

const closeTestDb = async () => {
  resetStore();
};

module.exports = {
  connectTestDb,
  clearTestDb,
  closeTestDb,
};
