const Author = require("../models/authors")
const Book = require("../models/books")

exports.create = async (req,res) =>{
    const author = new Author({
        name:req.body.name
    })
    try{
        await author.save()
        res.redirect("/authors")
        // res.redirect(`${new_author/id}`)
    }
    catch(error){
        res.render("authors/create",{
            author:author,
            errorMsg:'Error creating author.'
        })
    }
}
exports.get = async(req,res)=>{
    let search = {}
    if(req.query.name != null && req.query.name !== ""){
        search.name = new RegExp(req.query.name,"i")
    }
    try{
        const authors = await Author.find(search)
        res.render("authors/index",{
            authors:authors,
            search:req.query
        })
    }
    catch(error){
        res.redirect("/")
    }
}
exports.edit = async(req,res) =>{
    let author
    try{
        const author = await Author.findById(req.params.id)
        res.render("authors/edit",{
            author:author
        }) 
    }
    catch(error){
        if(author == null){
            res.redirect("/authors")
        }
        res.render("authors/edit",{
            author:author, 
            errorMsg:'Error creating author.'
        })
    }
}
exports.view = async (req,res) =>{
    let author
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author:author.id}).limit(10)
        res.render("authors/view",{
            author:author,
            books:books,
        }) 
    }
    catch(error){
        if(author == null){
            res.redirect("/authors")
        }
        res.redirect("/authors")
        // console.log(error)
    }
}
exports.update = async (req,res) =>{
    try{
        const author = await new Author({
            name:req.body.name
        })
        await findByIdAndUpdate(req.params.id,{
            $set:author,
            new:true
        })
        res.redirect(`/authors`)
    }
    catch(error){
        res.redirect(`/authors`)
    }
}
exports.delete = async (req,res) =>{
    try{
        // const author = await Author.findByIdAndDelete(req.params.id)
        const author = await Author.findById(req.params.id)

        const book  = Book.find({author:author._id})
        if(book.length > 0){
            author.remove()
            res.redirect("/authors")
        }else{
            res.redirect("/authors")
        }
    }
    catch(error){
        res.redirect("/authors")
    }
}