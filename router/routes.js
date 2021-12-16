const express = require("express")
const router = express.Router()
const Book = require("../models/books")

router.get("/",async (req,res)=>{
    try{
        const books = await Book.find().sort({"createdAt":"desc"}).limit(10).exec()
        res.render("index",{
            books:books
        })
    }
    catch(error){
        res.redirect("/")
    }
})

module.exports = router