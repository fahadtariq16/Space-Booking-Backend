const express = require("express");
const Location = require("../models/location");
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const location = await Location.find({
      visibility: true,
      deleted: false,
    }).sort("name");
    if (!location) {
      next(new ErrorResponse("Location Not Found", 404));
    }
    res.send(location);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const location = await Location.findById(
      { _id: req.params.id },
      { _id: 1, name: 1 }
    );
    if (!location) {
      next(new ErrorResponse("Location Not Found", 404));
    }
    res.send(location);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const location = new Location({
      name: req.body.name,
      visibility: true,
      deleted: false,
    });
    const postResult = await location.save();
    res.send(postResult);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updateLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { visibility: false, deleted: true },
      { new: true }
    );
    res.send(updateLocation);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.patch("/detail/:id", async (req, res) => {
  try {
    const updateLocationDetail = await Location.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.send(updateLocationDetail);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

module.exports = router;
