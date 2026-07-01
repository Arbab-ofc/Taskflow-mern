const mongoose = require("mongoose");

const store = {
  users: [],
  tasks: [],
};

const resetStore = () => {
  store.users = [];
  store.tasks = [];
};

const createId = () => new mongoose.Types.ObjectId().toString();

module.exports = {
  store,
  resetStore,
  createId,
};
