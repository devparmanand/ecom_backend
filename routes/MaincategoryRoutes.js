const MaincategoryRouter = require("express").Router()

const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord}  = require("../controller/MaincategoryController")

MaincategoryRouter.post("/",createRecord)
MaincategoryRouter.get("/",getAllRecord)
MaincategoryRouter.get("/:_id",getSingleRecord)
MaincategoryRouter.put("/:_id", updateRecord)   
MaincategoryRouter.delete("/:_id", deleteRecord)   

module.exports=MaincategoryRouter