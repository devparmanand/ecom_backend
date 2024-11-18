const mongoose = require("mongoose")

const WishlistScheema = new mongoose.Schema({
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
    
})
const Wishlist = new mongoose.model("Wishlist",WishlistScheema)

module.exports=Wishlist
