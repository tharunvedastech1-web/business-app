const Fish = require("../models/Fish");

const createFish = async (req, res) => {
  try {
    const fish = await Fish.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fish created successfully",
      data: fish,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFish = async (req, res) => {
  try {
    const fish = await Fish.find();

    res.status(200).json({
      success: true,
      data: fish,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFishById = async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);

    if (!fish) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      data: fish,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFish = async (req, res) => {
  try {
    const fish = await Fish.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!fish) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fish updated successfully",
      data: fish,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findByIdAndDelete(req.params.id);

    if (!fish) {
      return res.status(404).json({
        success: false,
        message: "Fish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fish deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFish,
  getFish,
  getFishById,
  updateFish,
  deleteFish,
};

