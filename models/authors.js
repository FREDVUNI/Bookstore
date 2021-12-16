const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    }
},{timestamps:true})

const authorModel = mongoose.model("authors",authorSchema)
module.exports = authorModel