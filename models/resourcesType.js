const mongoose = require("mongoose");
const locationInfo = require("./location");

const resourcesType = mongoose.model("Resources Type",new mongoose.Schema({
    name : {
        type : String
    },
    visibility : {
        type : Boolean
    },
    deleted : {
        type : Boolean
    },
    locationInfo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: locationInfo
    }
},{timestamps: true }))


module.exports = resourcesType;