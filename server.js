const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Import routers
const itemRoutes = require("./routes/itemRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();

// ✅ Use Railway’s PORT (fallback to 3000 locally, not 8000)
const PORT = process.env.PORT || 3000;

// ✅ Make sure you load the right MongoDB URI
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log("🔗 Mongo URI:", MONGO_URI ? "Loaded ✅" : "Missing ❌");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/items", itemRoutes);
app.use("/shipments", shipmentRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Important: use 0.0.0.0 so Railway can bind properly
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
