const mongoose = require("mongoose");
const resourcesTypeInfo = require("./resourcesType");
const locationInfo = require("./location");

const resources = mongoose.model(
  "Resources",
  new mongoose.Schema(
    {
      name: {
        type: String,
      },
      visibility: {
        type: Boolean,
      },
      deleted: {
        type: Boolean,
      },
      resourceTypeInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: resourcesTypeInfo,
      },
      locationInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationInfo,
      },
    },
    { timestamps: true }
  )
);

module.exports = resources;
