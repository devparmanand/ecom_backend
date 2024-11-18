const Cart = require("../model/Cart")
const Product = require("../model/Product")
async function createRecord(req,res){
    try {
        let product = await Product.findOne({_id: req.body.product})
        if( product && product.stockQuantity>=req.body.qty){
        const data = new Cart(req.body)
        await data.save()
        let finalData = await Cart.findOne({_id:data._id}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stockQuantity",
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
    }
    else{
        res.send({result:"Fail" , reason:"Cart Quantity Can't Be More Than Product Stock Quantity"})
       }
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
        error.errors?.product ? errorMessage.push({product:error.errors.product.message}) : ""
        error.errors?.qty ? errorMessage.push({qty:error.errors.qty.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
         }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Cart.find().sort({_id:-1}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic  stockQuantity",
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
        const data  = await Cart.findOne({_id:req.params._id}).populate([
            {
                path:"user",
                select:"name "
            },
            {
                path:"product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stockQuantity",
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

async function updateRecord(req,res){
     try {
        const data  = await Cart.findOne({_id:req.params._id})
        if(data){
        const product = await Product.findOne({_id: data.product})
        if( product && product.stockQuantity>=req.body.qty){
            data.qty=req.body.qty??data.qty
            data.total=req.body.total??data.total
            await data.save()
            let finalData = await Cart.findOne({_id:data._id}).populate([
                {
                    path:"user",
                    select:"name "
                },
                {
                    path:"product",
                    select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic stock stockQuantity",
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
    
                }
            ])
        res.send({result:"Done", data:finalData,message:"Record Updated, Successfully"})  
               }
               else{
                res.send({result:"Fail" , reason:"Cart Quantity Can't Be More Than Product Stock Quantity"})
               }
        }
        
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        console.log(error);
         res.status(500).send({result:"Fail",reason:"Internal Server Error"})
       }
}

async function deleteRecord(req,res){
    
    try {
        const data  = await Cart.findOne({_id:req.params._id})
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
    updateRecord,
    deleteRecord
}



