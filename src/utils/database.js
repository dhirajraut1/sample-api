const { query } = require("../config/database");
const fs = require("fs");

const runMigrations = async () => {
  const migrationSQL = fs.readFileSync(
    "./migrations/001-initial-schema.sql",
    "utf8"
  );

  try {
    await query(migrationSQL);
    console.log("Database migrations completed successfully");
  } catch (err) {
    console.error("Migration failed:", err.message || err);
    throw err;
  }
};

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { runMigrations };
