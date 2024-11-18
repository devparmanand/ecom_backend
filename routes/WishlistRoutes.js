const WishlistRouter = require("express").Router()
const {createRecord, getAllRecord, getSingleRecord, deleteRecord} 
 = require("../controller/WishlistController")

WishlistRouter.post("/",createRecord)
WishlistRouter.get("/",getAllRecord)
WishlistRouter.get("/:_id",getSingleRecord)
WishlistRouter.delete("/:_id", deleteRecord)   

module.exports=WishlistRouter