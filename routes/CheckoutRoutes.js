const CheckoutRouter = require("express").Router()
// const {verifyAdmin,verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord, getAllUserRecords} 
 = require("../controller/CheckoutController")

CheckoutRouter.post("/", createRecord)
CheckoutRouter.get("/" ,getAllRecord)
CheckoutRouter.get("/user/:userid",getAllUserRecords)
CheckoutRouter.get("/:_id",getSingleRecord)
CheckoutRouter.put("/:_id",updateRecord)   
CheckoutRouter.delete("/:_id", deleteRecord)   

module.exports=CheckoutRouter