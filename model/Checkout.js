const mongoose = require("mongoose")

const CheckScheema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User  Id is Mandaitory"],
    
    },
    orderStatus:{
       type:String,
       default:"Order is Placed"
    },

    paymentMode:{
        type:String,
        default:"COD"
     },

     paymentStatus:{
        type:String,
        default:"Pending"
     },

     subtotal:{
        type:Number,
        required:[true,"Subtotal Amount   is Mandaitory"],
    },

    shipping:{
        type:Number,
        required:[true,"Shipping Amount   is Mandaitory"],
    },

    total:{
        type:Number,
        required:[true,"Total Amount   is Mandaitory"],
    },

    rppid:{
        type:Number,
        default:""
    },

    date:{
        type:String,
        default:"" 
    },
   products:[
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:[true,"Product  Id is Mandaitory"],
        },
        
        qty:{
            type:Number,
            required:[true,"Checkout Product Quantity   is Mandaitory"],
        },
    
        total:{
            type:Number,
            required:[true,"Total Amount   is Mandaitory"],
        },
    }
   ]
})
const Checkout = new mongoose.model("Checkout",CheckScheema)

module.exports=Checkout
