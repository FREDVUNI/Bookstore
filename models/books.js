const mongoose = require("mongoose")
const coverImagePath ="uploads/bookCovers"

const BookSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{ 
        type:String
    },
    publishDate:{
        type:Date,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'authors'
    }
},{timestamps:true})

const BookModel = mongoose.model("books",BookSchema)
module.exports = BookModel 
module.exports.coverImagePath = coverImagePath 