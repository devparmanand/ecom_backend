const mongoose = require("mongoose")

const BrandScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Brand Name  is Mandaitory"],
        unique:true
    },

     pic:{
        type:String,
        required:[true,"Brand Pic  is Mandaitory"],
    },

    active:{
        type:Boolean,
        default:true
    }

})

const Brand = new mongoose.model("Brand",BrandScheema)

module.exports=Brand
