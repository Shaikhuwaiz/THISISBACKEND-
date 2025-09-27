const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Import routers
const itemRoutes = require("./routes/itemRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();
const PORT = process.env.PORT || 8000;   // Railway will inject this
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shipmentsDB";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log("🔗 Mongo URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use routers
app.use("/items", itemRoutes);
app.use("/shipments", shipmentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
