const mongoose = require("mongoose");
const resourcesInfo = require("./resources");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Client"],
    },
    visibility: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
