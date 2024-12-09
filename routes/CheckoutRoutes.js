const CheckoutRouter = require("express").Router()
const {verifyAdmin,verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord, getAllUserRecords} 
 = require("../controller/CheckoutController")

CheckoutRouter.post("/", verifyBoth, createRecord)
CheckoutRouter.get("/" , verifyAdmin,getAllRecord)
CheckoutRouter.get("/user/:userid", verifyBoth,getAllUserRecords)
CheckoutRouter.get("/:_id", verifyBoth,getSingleRecord)
CheckoutRouter.put("/:_id", verifyAdmin,updateRecord)   
CheckoutRouter.delete("/:_id",verifyAdmin, deleteRecord)   

module.exports=CheckoutRouter