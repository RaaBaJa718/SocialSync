const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Define routes
router.get("/", getAllUsers); // Get all users
router.get("/:userId", getUserById); // Get a user by ID
router.post("/", createUser); // Create a new user
router.put("/:userId", updateUser); // Update a user by ID
router.delete("/:userId", deleteUser); // Delete a user by ID

module.exports = router;