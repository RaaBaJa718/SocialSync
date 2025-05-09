const express = require("express");
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require("../controllers/thoughtController");

const router = express.Router();

// Define routes
router.get("/", getAllThoughts); // Get all thoughts
router.get("/:thoughtId", getThoughtById); // Get a thought by ID
router.post("/", createThought); // Create a new thought
router.put("/:thoughtId", updateThought); // Update a thought by ID
router.delete("/:thoughtId", deleteThought); // Delete a thought by ID

// Reaction routes
router.post("/:thoughtId/reactions", addReaction); // Add a reaction to a thought
router.delete("/:thoughtId/reactions/:reactionId", removeReaction); // Remove a reaction from a thought

module.exports = router;