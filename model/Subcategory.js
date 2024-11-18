const mongoose = require("mongoose")

const SubcategoryScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Subcategory Name  is Mandaitory"],
        unique:true
    },

    active:{
        type:Boolean,
        default:true
    }

})

const Subcategory = new mongoose.model("Subcategory",SubcategoryScheema)

module.exports=Subcategory
