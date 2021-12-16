const express = require("express")
const router = express.Router()
const authorController = require("../controllers/Authors")

router.get("/",authorController.get)

router.get("/create",(req,res)=>{
    res.render("authors/create")
})

router.post("/create",authorController.create)

router.get("/:id/edit",authorController.edit)

router.get("/:id/view",authorController.view)

router.put("/:id/update",authorController.update)

router.delete("/:id/delete",authorController.delete)

module.exports = router