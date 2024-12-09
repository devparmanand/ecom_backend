const ProductRouter = require("express").Router()
const {productUploader} = require("../multerMilddleware/fileUploader")
const {verifyAdmin} = require("../multerMilddleware/validation")

const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/ProductController")

ProductRouter.post("/" , verifyAdmin,productUploader.array("pic") ,createRecord)
ProductRouter.get("/",getAllRecord)
ProductRouter.get("/:_id",getSingleRecord)
ProductRouter.put("/:_id", verifyAdmin,productUploader.array("pic"),updateRecord)   
ProductRouter.delete("/:_id", verifyAdmin,deleteRecord)   

module.exports=ProductRouter