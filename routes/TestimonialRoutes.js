const TestimonialRouter = require("express").Router()
const {verifyAdmin} = require("../multerMilddleware/validation")
const {testimonialUploader} = require("../multerMilddleware/fileUploader")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/TestimonialController")

TestimonialRouter.post("/", verifyAdmin,testimonialUploader.single("pic") ,createRecord)
TestimonialRouter.get("/",getAllRecord)
TestimonialRouter.get("/:_id",getSingleRecord)
TestimonialRouter.put("/:_id", verifyAdmin,testimonialUploader.single("pic"),updateRecord)   
TestimonialRouter.delete("/:_id", verifyAdmin,deleteRecord)   

module.exports=TestimonialRouter