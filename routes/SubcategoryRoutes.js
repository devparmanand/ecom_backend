const SubcategoryRouter = require("express").Router()

const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord}  = require("../controller/SubcategoryController")

SubcategoryRouter.post("/",createRecord)
SubcategoryRouter.get("/",getAllRecord)
SubcategoryRouter.get("/:_id",getSingleRecord)
SubcategoryRouter.put("/:_id", updateRecord)   
SubcategoryRouter.delete("/:_id", deleteRecord)   

module.exports=SubcategoryRouter