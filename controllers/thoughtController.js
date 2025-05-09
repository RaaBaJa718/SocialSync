const Thought = require("../models/thoughts");
const User = require("../models/users");

// Get all thoughts
async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving thoughts", error });
  }
}

// Get a thought by ID
async function getThoughtById(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate("reactions");
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving thought", error });
  }
}

// Create a new thought
async function createThought(req, res) {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ message: "Error creating thought", error });
  }
}

// Update a thought by ID
async function updateThought(req, res) {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!updatedThought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ message: "Error updating thought", error });
  }
}

// Delete a thought
async function deleteThought(req, res) {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });

    await User.findByIdAndUpdate(
      thought.userId,
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting thought", error });
  }
}

// Add a reaction to a thought
async function addReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error adding reaction", error });
  }
}

// Remove a reaction from a thought
async function removeReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: "Thought not found or reaction missing" });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error });
  }
}

// Export all functions
module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};