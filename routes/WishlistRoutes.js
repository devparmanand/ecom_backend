const WishlistRouter = require("express").Router()
// const {verifyBoth} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, deleteRecord} 
 = require("../controller/WishlistController")

WishlistRouter.post("/" , createRecord)
WishlistRouter.get("/:userid",getAllRecord)
WishlistRouter.get("/single/:_id",getSingleRecord)
WishlistRouter.delete("/:_id",  deleteRecord)   

module.exports=WishlistRouter