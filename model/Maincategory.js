const mongoose = require("mongoose")

const MaincategoryScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Maincategory Name  is Mandaitory"],
        unique:true
    },

    active:{
        type:Boolean,
        default:true
    }

})

const Maincategory = new mongoose.model("Maincategory",MaincategoryScheema)

module.exports=Maincategory
