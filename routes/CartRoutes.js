const CartRouter = require("express").Router()
const {verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/CartController")

CartRouter.post("/", verifyBoth,createRecord)
CartRouter.get("/",verifyBoth,getAllRecord)
CartRouter.get("/:_id",verifyBoth,getSingleRecord)
CartRouter.put("/:_id",verifyBoth,updateRecord)   
CartRouter.delete("/:_id",verifyBoth, deleteRecord)   

module.exports=CartRouter