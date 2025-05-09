const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
},
{
  toJSON: { virtuals: true },
});

// Virtual to get the count of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Export the model
module.exports = mongoose.model("user", UserSchema, "users");