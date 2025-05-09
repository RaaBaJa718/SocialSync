const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connections"); // Database connection

dotenv.config();
connectDB(); // Initialize MongoDB connection

const app = express();
app.use(express.json());

// Use centralized routes
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));