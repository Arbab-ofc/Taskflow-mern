process.env.NODE_ENV = "test";

const app = require("../src/server");
const { clearTestDb, closeTestDb, connectTestDb } = require("./helpers/testDb");

const suites = [
  ["auth routes", require("./authRoutes/auth.test")],
  ["task routes CRUD", require("./taskRoutes/crud.test")],
  ["task validation", require("./taskRoutes/validation.test")],
  ["not found handling", require("./taskRoutes/notFound.test")],
  ["query/filter/sort/pagination", require("./taskRoutes/queryFilterSort.test")],
  ["status history", require("./taskRoutes/statusHistory.test")],
  ["soft delete and restore", require("./taskRoutes/softDelete.test")],
  ["stats endpoint", require("./taskRoutes/stats.test")],
  ["health endpoint", require("./taskRoutes/health.test")],
];

const run = async () => {
  await connectTestDb();

  for (const [name, suite] of suites) {
    await clearTestDb();
    await suite(app);
    console.log(`Passed: ${name}`);
  }

  await closeTestDb();
  console.log("All backend tests passed");
};

run().catch(async (error) => {
  console.error(error);
  await closeTestDb();
  process.exit(1);
});
