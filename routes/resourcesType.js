const express = require("express");
const ResourcesType = require("../models/resourcesType");
const Location = require("../models/location");
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resourcesType = await ResourcesType.find().sort("name");
    if (!resourcesType) {
      next(new ErrorResponse("Resources Not Found", 404));
    }
    res.send(resourcesType);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resourceType = await ResourcesType.findById(
      { _id: req.params.id },
      { _id: 1, name: 1 }
    );
    if (!resourceType) {
      next(new ErrorResponse("Location Not Found", 404));
    }
    res.send(resourceType);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resourcesType = new ResourcesType({
      id: req.body.id,
      name: req.body.name,
      locationInfo: req.body.location,
      visibility: req.body.visibility,
      deleted: req.body.deleted,
    });
    const postResult = await resourcesType.save();
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
    const updateResourceType = await ResourcesType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updateResourceType);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.patch("/detail/:id", async (req, res) => {
  try {
    const updateResourceTypeDetail = await ResourcesType.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.send(updateResourceTypeDetail);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

module.exports = router;
