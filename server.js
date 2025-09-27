const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Import routers
const itemRoutes = require("./routes/itemRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();
const PORT = process.env.PORT || 7001;   // Railway will inject its own PORT
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shipmentsDB";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use routers
app.use("/items", itemRoutes);           
app.use("/shipments", shipmentRoutes);   

// Optional: root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
