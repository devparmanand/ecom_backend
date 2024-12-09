const SubcategoryRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")

const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord}  = require("../controller/SubcategoryController")

SubcategoryRouter.post("/",verifyAdmin, createRecord)
SubcategoryRouter.get("/",getAllRecord)
SubcategoryRouter.get("/:_id",getSingleRecord)
SubcategoryRouter.put("/:_id", verifyAdmin,updateRecord)   
SubcategoryRouter.delete("/:_id", verifyAdmin, deleteRecord)   

module.exports=SubcategoryRouter