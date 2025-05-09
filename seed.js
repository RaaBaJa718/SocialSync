const mongoose = require("mongoose");
const User = require("./models/users");
const Thought = require("./models/thoughts");
const connectDB = require("./config/connections");

connectDB();

async function seedData() {
  await User.create([
    { username: "user1", email: "user1@email.com" },
    { username: "user2", email: "user2@email.com" }
  ]);

  await Thought.create([
    { thoughtText: "This is a test thought", username: "user1" }
  ]);

  console.log("Database seeded!");
  process.exit();
}

seedData();