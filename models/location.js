const mongoose = require("mongoose");

const location = mongoose.model("Location",new mongoose.Schema({
    name : {
        type : String
    },
    visibility : {
        type : Boolean
    },
    deleted : {
        type : Boolean
    }
},{timestamps: true}))


module.exports = location;
