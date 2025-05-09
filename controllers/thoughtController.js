import Thought from "../models/thought.js";
import User from "../models/user.js";

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving thoughts", error });
    }
  },

  // Get a single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate("reactions");
      if (!thought) return res.status(404).json({ message: "Thought not found" });
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving thought", error });
    }
  },

  // Create a new thought and associate it with a user
  async createThought(req, res) {
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
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) return res.status(404).json({ message: "Thought not found" });
      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Error updating thought", error });
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) return res.status(404).json({ message: "Thought not found" });
      res.status(200).json({ message: "Thought deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting thought", error });
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!updatedThought) return res.status(404).json({ message: "Thought not found" });
      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Error adding reaction", error });
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) return res.status(404).json({ message: "Thought not found" });
      res.status(200).json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Error removing reaction", error });
    }
  },
};