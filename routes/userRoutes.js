const express = require("express");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../controllers/userController"); // ✅ Proper Import

const router = express.Router();

// Debug Route to check users
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

// Main Routes
router.get("/", getAllUsers); // Get all users
router.get("/:userId", getUserById); // Get a user by ID
router.post("/", createUser); // Create a new user
router.put("/:userId", updateUser); // Update a user by ID
router.delete("/:userId", deleteUser); // Delete a user by ID

// Friend Routes
router.post("/:userId/friends/:friendId", addFriend); // ✅ Fix function reference
router.delete("/:userId/friends/:friendId", deleteFriend); // ✅ Fix function reference

module.exports = router;