const Order = require("../models/oder");
const Fish = require("../models/Fish");

const createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item",
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const fish = await Fish.findById(item.fish);

            if (!fish) {
                return res.status(404).json({
                    success: false,
                    message: `Fish not found: ${item.fish}`,
                });
            }

            if (!fish.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: `${fish.name} is currently unavailable`,
                });
            }

            const totalPrice = fish.pricePerKg * item.quantity;

            orderItems.push({
                fish: fish._id,
                quantity: item.quantity,
                pricePerKg: fish.pricePerKg,
                totalPrice,
            });

            totalAmount += totalPrice;
        }

        const order = await Order.create({
            customer: req.user.userId,
            items: orderItems,
            totalAmount,
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customer: req.user.userId,
        })
            .populate("items.fish", "name category")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name phone email customerType")
      .populate("items.fish", "name category pricePerKg")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createOrder, getMyOrders, getAllOrders,
};

