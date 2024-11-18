const ContactUsRouter = require("express").Router()
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/ContactUsController")

ContactUsRouter.post("/" ,createRecord)
ContactUsRouter.get("/",getAllRecord)
ContactUsRouter.get("/:_id",getSingleRecord)
ContactUsRouter.put("/:_id",updateRecord)   
ContactUsRouter.delete("/:_id", deleteRecord)   

module.exports=ContactUsRouter