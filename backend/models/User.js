const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    customerType: {
      type: String,
      enum: ["retailer", "restaurant", "function_hall", "individual"],
      default: "individual",
    },

    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
