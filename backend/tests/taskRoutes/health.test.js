const assert = require("../helpers/assert");
const invoke = require("../helpers/request");

const runHealthTests = async (app) => {
  const response = await invoke(app, { method: "GET", url: "/health" });
  assert(response.statusCode === 200, "Expected health endpoint to succeed");
  assert(response.body.success === true, "Expected health success response");
  assert(response.body.data.status === "ok", "Expected health status ok");
  assert(
    response.body.data.mongodb.connected === false,
    "Expected MongoDB test store to be disconnected"
  );
};

module.exports = runHealthTests;
