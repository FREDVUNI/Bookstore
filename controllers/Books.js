const BookModel = require("../models/books")
const Author = require("../models/authors")

const multer = require("multer")

const mimeTypes = ['images/png','images/jpg','images/gif']

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"public/uploads")
    },
    fileFilter:(req,file,cb) =>{
        cb(null,mimeTypes.includes(file.mimetype))
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload = multer({storage:storage})

exports.get = async (req,res) =>{
    try{
        const authors = await Author.find({})
        const book = new BookModel()
        res.render("books/create",{
            book:book,
            authors:authors,
        })
    }
    catch(error){
       res.redirect("/books")
    }
}
exports.getBook = async (req,res)=>{
    try{
        const book = await BookModel.findById(req.params.id).populate('author').exec()
        res.render("books/view",{
            book:book,
        })
    }
    catch(error){
        console.log(error)
        res.redirect("/books")
    }
}
exports.edit = async (req,res) =>{
     try{
        const authors = await Author.find()
        const book = await BookModel.findById(req.params.id).populate('author').exec()
        res.render("books/edit",{
            book:book,
            authors:authors
        })
    }
    catch(error){
        console.log(error)
        res.redirect("/books")
    }
}

// exports.update = upload.single("coverImage"),async (req,res)=>{
//     const BookCover = await findById(req.params.id)
    
//     const cover = BookCover.coverImage

//     const fileName = req.file != null ? req.file.filename:cover
//         const book = new BookModel({
//             title:req.body.title,   
//             description:req.body.description,   
//             publishDate:new Date(req.body.publishDate),   
//             pageCount:req.body.pageCount,
//             coverImage:fileName,   
//             author:req.body.author
//         }) 
//         try{
//             await findByIdAndUpdate(req.params.id,{
//                 $set:book,
//                 new:true
//             }) 
//             res.redirect("/books")
//         }
//         catch(error){
//             console.log(error)
//             res.redirect("/books")
//         }
// }
exports.delete = async (req,res) =>{
    try{
        // const book = await BookModel.findByIdAndDelete(req.params.id)
        const book = await BookModel.findById(req.params.id)
        book.remove()
        res.redirect("/books")
    }
    catch(error){
        res.redirect("/authors")
    }
}

// exports.create = async(req,res) =>{
//     upload.single("coverImage")
//     const authors = await Author.find({})
//     const fileName = req.file != null ? req.file.filename:null
//     const book = new BookModel({
//         title:req.body.title,   
//         description:req.body.description,   
//         publishDate:new Date(req.body.publishDate),   
//         pageCount:req.body.pageCount,
//         coverImage:fileName,   
//         author:req.body.author
//     }) 
//     try{
//         const await book.save()
//         res.redirect("/books")
//         // res.redirect(`${new_book/id}`)
//     }
//     catch(error){
//         res.render("books/create",{
//             book:book,
//             authors:authors,
//             errorMsg:'Error creating book.'
//         })
//     }
// }

exports.books = async (req,res) =>{
    let query = BookModel.find()
    if(req.query.title != null && req.query.title !== ""){
        query = query.regex('title',new RegExp(req.query.title,'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore !== ""){
        query = query.lte('publishedBefore',req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter !== ""){
        query = query.gte('publishedAfter',req.query.publishedAfter)
    }
    try{
        const books = await query.exec()
        res.render("books/index",{
            books:books,
            searchOptions:req.query,
        })
    }
    catch(error){
        res.redirect("/")
    }
}