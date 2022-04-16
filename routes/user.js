const express = require("express");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find({
      role: "Client",
      visibility: true,
      deleted: false,
    }).sort("name");
    if (!user) {
      next(new ErrorResponse("User Not Found", 404));
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

router.get("/userrole/role", async (req, res, next) => {
  try {
    const user = await User.find({}, { _id: 1, email: 1, role: 1 });
    if (!user) {
      console.log("User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const user = new User({
      id: req.body.id,
      name: req.body.name,
      visibility: req.body.visibility,
      deleted: req.body.deleted,
    });
    const postResult = await user.save();
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
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { visibility: false, deleted: true },
      { new: true }
    );
    res.send(updateUser);
  } catch (error) {
    res.status(500).json({
      success: "false",
      error: error.message,
    });
  }
});

module.exports = router;
