const express = require("express")
const router = express.Router()
const path= require("path")
const fs= require("fs")
const bookController = require("../controllers/Books")
const multer = require("multer")
const Book = require("../models/books")
const Author = require("../models/authors")
const { now } = require("mongoose")
const uploadPath = path.join("public",Book.coverImagePath)

const mimeTypes = ['images/png','images/jpg','images/gif']
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"images/uploads");
   },
    fileFilter:(req,file,cb) =>{
        cb(null,mimeTypes.includes(file.mimetype))
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
        // cb(null, file.fieldname + '-' + Date.now() + "." + extension);
    }
})
const upload = multer({storage:storage})

router.get("/:id/view",bookController.getBook) 

router.get("/:id/edit",bookController.edit)

// router.put("/:id/update",bookController.update)

router.delete("/:id/delete",bookController.delete)

router.get("/",bookController.books)

router.get("/create",bookController.get)

router.post("/create",upload.single("coverImage"),async(req,res)=>{
    const authors = await Author.find({})
    const fileName = req.file != null ? req.file.filename:null

    const book = new Book({
        title:req.body.title,   
        description:req.body.description,   
        publishDate:new Date(req.body.publishDate),   
        pageCount:req.body.pageCount,
        coverImage:fileName,   
        author:req.body.author
    }) 
    // return res.json(book);
    try{
        const new_book = await book.save()
        res.redirect("/books")
        // res.redirect(`${new_book/id}`)
    }
    catch(error){
        res.render("books/create",{
            book:book,
            authors:authors,
            errorMsg:'Error creating book.'
        })
    }
})
router.put("/:id/update",upload.single("coverImage"),async(req,res)=>{
    const books = await Book.findById(req.params.id)
    
    const cover = books.coverImage

    const fileName = req.file != null ? req.file.filename:cover
    books.title = req.body.title
    books.author = req.body.author
    books.description = req.body.description
    books.publishDate = new Date(req.body.publishDate)
    books.pageCount = req.body.pageCount
    books.coverImage = fileName
        try{
            await books.save()

            // fs.unlink("./images/uploads/"+req.file.filename, (err) => {
            // if (err) {
            //     console.log("failed to delete local image:"+err);
            // } else {
            //     console.log('successfully deleted local image');                                
            // }
            // });

            res.redirect("/books")
        }
        catch(error){
            console.log(error)
            res.redirect("/books")
        }
})

module.exports = router 