const express = require("express");
const Resources = require("../models/resources");
const ResourcesType = require("../models/resourcesType");
const Location = require("../models/location");
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.find({
      visibility: true,
      deleted: false,
    }).sort("name");
    if (!resources) {
      next(new ErrorResponse("Resources Not Found", 404));
    }
    res.send(resources);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const resource = await Resources.findById(
      { _id: req.params.id },
      { _id: 1, name: 1 }
    );
    if (!resource) {
      next(new ErrorResponse("Location Not Found", 404));
    }
    res.send(resource);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resources = new Resources({
      name: req.body.name,
      resourceTypeInfo: req.body.resourceType,
      locationInfo: req.body.location,
      visibility: true,
      deleted: false,
    });
    const postResult = await resources.save();
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
    const updateResources = await Resources.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updateResources);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.patch("/detail/:id", async (req, res) => {
  try {
    const updateResourceDetail = await Resources.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.send(updateResourceDetail);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

module.exports = router;
