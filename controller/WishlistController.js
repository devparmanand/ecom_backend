const Wishlist = require("../model/Wishlist")
async function createRecord(req,res){
    try {
        const data = new Wishlist(req.body)
        await data.save()

        let finalData = await Wishlist.findOne({_id:data._id}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stock stockQuntity",
                options:{slice:{pic:1}},
                populate:[
                        { 
                           path:"maincategory",
                           select:"name "
                        },
                        {
                            path:"subcategory",
                            select:"name "
                         },
                         {
                            path:"brand", 
                            select:"name "
                         },
                ],

            },

        ])
           res.send({result:"Done", data:finalData ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
        error.errors?.product ? errorMessage.push({product:error.errors.product.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
         }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Wishlist.find().sort({_id:-1}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stock stockQuntity",
                options:{slice:{pic:1}},
                populate:[
                        { 
                           path:"maincategory",
                           select:"name "
                        },
                        {
                            path:"subcategory",
                            select:"name "
                         },
                         {
                            path:"brand", 
                            select:"name "
                         },
                ],

            },

        ])
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Wishlist.findOne({_id:req.params._id}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stock stockQuntity",
                options:{slice:{pic:1}},
                populate:[
                        { 
                           path:"maincategory",
                           select:"name "
                        },
                        {
                            path:"subcategory",
                            select:"name "
                         },
                         {
                            path:"brand", 
                            select:"name "
                         },
                ],

            },

        ])
        if(data)
          res.send({result:"Done",data:data})  
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}



async function deleteRecord(req,res){
    
    try {
        const data  = await Wishlist.findOne({_id:req.params._id})
        if(data){
            await data.deleteOne()
            res.send({result:"Done",reason:"Record is Deleted"})  
       }
       else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

module.exports={
    createRecord,
    getAllRecord,
    getSingleRecord,
    deleteRecord
}



