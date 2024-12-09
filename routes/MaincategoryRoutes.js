const MaincategoryRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord}  = require("../controller/MaincategoryController")

MaincategoryRouter.post("/",verifyAdmin,createRecord)
MaincategoryRouter.get("/",getAllRecord)
MaincategoryRouter.get("/:_id" ,getSingleRecord)
MaincategoryRouter.put("/:_id", verifyAdmin, updateRecord)   
MaincategoryRouter.delete("/:_id",verifyAdmin, deleteRecord)   

module.exports=MaincategoryRouter