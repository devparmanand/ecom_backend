const mongoose = require("mongoose")

const CartScheema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User  Id is Mandaitory"],
    
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"Product  Id is Mandaitory"],
    },
    
    qty:{
        type:Number,
        required:[true,"Cart Product Quantity   is Mandaitory"],
    },

    total:{
        type:Number,
        required:[true,"Total Amount   is Mandaitory"],
    },
})
const Cart = new mongoose.model("Cart",CartScheema)

module.exports=Cart
