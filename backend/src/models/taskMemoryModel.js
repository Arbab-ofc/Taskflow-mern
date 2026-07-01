const { createMemoryModel } = require("./memoryUtils");

module.exports = createMemoryModel({
  collectionName: "tasks",
  onCreate: (doc) => {
    if (!Array.isArray(doc.statusHistory)) {
      doc.statusHistory = [];
    }
    if (doc.deletedAt === undefined) {
      doc.deletedAt = null;
    }
  },
});
