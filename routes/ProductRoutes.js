const ProductRouter = require("express").Router()
const {productUploader} = require("../multerMilddleware/fileUploader")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/ProductController")

ProductRouter.post("/",productUploader.array("pic") ,createRecord)
ProductRouter.get("/",getAllRecord)
ProductRouter.get("/:_id",getSingleRecord)
ProductRouter.put("/:_id", productUploader.array("pic"),updateRecord)   
ProductRouter.delete("/:_id", deleteRecord)   

module.exports=ProductRouter