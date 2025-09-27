const express = require("express");
const {
  getShipments,
  getShipmentById,
  createShipment,
  deleteShipment, // ✅ imported here
} = require("../controllers/shipmentController");

const router = express.Router();

router.get("/", getShipments);
router.get("/:id", getShipmentById);
router.post("/", createShipment);
router.delete("/:id", deleteShipment); // ✅ delete route

module.exports = router;
