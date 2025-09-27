const Shipment = require("../models/shipmentModel");

// Get all shipments
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get shipment by trackingId
const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id });
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create shipment
const createShipment = async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    const savedShipment = await shipment.save();
    res.status(201).json(savedShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete shipment
const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all controllers here
module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  deleteShipment,
};
