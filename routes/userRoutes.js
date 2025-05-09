const express = require("express");
const User = require("../models/users");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Define routes
router.get("/debug", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Debug Route Users:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users in debug route:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

router.get("/", getAllUsers); // Get all users
router.get("/:userId", getUserById); // Get a user by ID
router.post("/", createUser); // Create a new user
router.put("/:userId", updateUser); // Update a user by ID
router.delete("/:userId", deleteUser); // Delete a user by ID
router.post("/:userId/friends/:friendId", userController.addFriend);

module.exports = router;