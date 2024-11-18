const BrandRouter = require("express").Router()
const {brandUploader} = require("../multerMilddleware/fileUploader")
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/BrandController")

BrandRouter.post("/",verifyAdmin,brandUploader.single("pic") ,createRecord)
BrandRouter.get("/",verifyAdmin,getAllRecord)
BrandRouter.get("/:_id",getSingleRecord)
BrandRouter.put("/:_id", brandUploader.single("pic"),updateRecord)   
BrandRouter.delete("/:_id", deleteRecord)   

module.exports=BrandRouter