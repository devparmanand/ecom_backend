const CartRouter = require("express").Router()
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/CartController")

CartRouter.post("/",createRecord)
CartRouter.get("/",getAllRecord)
CartRouter.get("/:_id",getSingleRecord)
CartRouter.put("/:_id",updateRecord)   
CartRouter.delete("/:_id", deleteRecord)   

module.exports=CartRouter