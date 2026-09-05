const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        fish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fish",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        pricePerKg: {
          type: Number,
          required: true,
        },

        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "PREPARING",
        "READY_FOR_DELIVERY",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
      ],
      default: "PENDING",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);