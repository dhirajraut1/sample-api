require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../src/config/database");
const User = require("../src/models/User");

(async () => {
  try {
    const {
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      ADMIN_FIRST_NAME = "Super",
      ADMIN_LAST_NAME = "Admin",
    } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error(
        "Missing required env vars: ADMIN_EMAIL and ADMIN_PASSWORD. Aborting."
      );
      process.exit(1);
    }

    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log(
        `Admin already exists: ${existingAdmin.email}. No changes made.`
      );
      await mongoose.connection.close();
      process.exit(0);
    }

    const admin = await User.createWithHash({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      firstName: ADMIN_FIRST_NAME,
      lastName: ADMIN_LAST_NAME,
      role: "admin",
    });

    console.log(`Super admin created: ${admin.email}`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed super admin:", err);
    try { await mongoose.connection.close(); } catch (_) {}
    process.exit(1);
  }
})();
