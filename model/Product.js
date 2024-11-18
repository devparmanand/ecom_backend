const mongoose = require("mongoose")

const ProductScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name  is Mandaitory"],
    
    },
      
    maincategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Maincategory",
        required:[true,"Product Maincategory Name  Id is Mandaitory"],
    
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategory",
        required:[true,"Product Subcategory Name  Id is Mandaitory"],
    },

    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        required:[true,"Product Brand Name  Id is Mandaitory"],
    },

    color:{
        type:String,
        required:[true,"Product Color Name   is Mandaitory"],
    },

    size:{
        type:String,
        required:[true,"Product Size Name   is Mandaitory"],
    },

    basePrice:{
        type:Number,
        required:[true,"Product Base Price Name   is Mandaitory"],
    },

    discount:{
        type:Number,
        required:[true,"Product Discount Name   is Mandaitory"],
    },

    finalPrice:{
        type:Number,
        required:[true,"Product Final Price Name   is Mandaitory"],
    },

    stock:{
        type:Boolean,
        default:true
    },

    stockQuantity:{
        type:Number,
        required:[true,"Product Stock Quantity Name   is Mandaitory"],
        
    },

    description:{
        type:String,
        default:""
    },

    pic:[
       
],


    active:{
        type:Boolean,
        default:true
    }

})

const Product = new mongoose.model("Product",ProductScheema)

module.exports=Product
