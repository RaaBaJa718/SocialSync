const mongoose = require("mongoose");
const ReactionSchema = require("../models/reaction"); // Keep it lowercase to match the file name // Import the separate Reaction schema

// Define Thought Schema
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Corrected to use external Reaction schema
}, {
  toJSON: { virtuals: true, getters: true },
});

// Virtual to get the count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Export the model
module.exports = mongoose.model("Thought", ThoughtSchema);