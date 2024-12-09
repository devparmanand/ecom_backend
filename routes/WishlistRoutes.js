const WishlistRouter = require("express").Router()
const {verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, deleteRecord} 
 = require("../controller/WishlistController")

WishlistRouter.post("/" , verifyBoth,createRecord)
WishlistRouter.get("/",verifyBoth,getAllRecord)
WishlistRouter.get("/:_id",verifyBoth,getSingleRecord)
WishlistRouter.delete("/:_id", verifyBoth, deleteRecord)   

module.exports=WishlistRouter