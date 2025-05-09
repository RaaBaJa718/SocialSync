const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import database connection

dotenv.config();
const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Routes (we will add these files next!)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/thoughts", require("./routes/thoughtRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));