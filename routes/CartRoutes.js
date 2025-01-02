const CartRouter = require("express").Router()
// const {verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/CartController")

CartRouter.post("/" ,createRecord)
CartRouter.get("/:userid",getAllRecord)
CartRouter.get("/single/:_id",getSingleRecord)
CartRouter.put("/:_id",updateRecord)   
CartRouter.delete("/:_id", deleteRecord)   

module.exports=CartRouter