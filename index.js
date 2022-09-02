const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const connectDB = require("./database/connect")
const methodOverride = require("method-override")

const app = express()
dotenv.config({path:"config.env"})
const PORT = process.env.PORT || 8080
app.use(morgan("tiny")) 
app.use(methodOverride("_method"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")  

app.use("/",require("./router/routes"))
app.use("/authors",require("./router/authors")) 
app.use("/books",require("./router/books"))

app.use("/css",express.static(path.resolve(__dirname,"assets/css"))) 
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))
app.use("/webfonts",express.static(path.resolve(__dirname,"assets/webfonts")))
app.use("/images",express.static(path.resolve(__dirname,"images/uploads")))
 
connectDB()    
app.listen(PORT,()=>{
    console.log(`connected to server http://localhost:${PORT}`); 
})