const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    pricePerKg: {
      type: Number,
      required: true,
    },
    availableQuantity: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: "kg",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fish", fishSchema);