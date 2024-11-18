const Checkout = require("../model/Checkout")
const Product = require("../model/Product")
const mailer = require("../mailer")
async function createRecord(req,res){
    try {
        const data = new Checkout(req.body)
        data.date = new Date()
        
        await data.save()
        data.products.forEach( async(x)=>{
            let product = await Product.findOne({_id:x.product})
               product.stockQuantity=product.stockQuantity-x.qty
               product.stock = product.stockQuantity-x.qty=== 0 ? false : true
               await product.save() 
               })
 let check = await Checkout.findOne({_id:data._id},{_id:0,user:1}).populate({path:"user",select:"name -_id email"})
  let {user}=check
              
 mailer.sendMail({
                from:process.env.MAIL_SENDER,
                to:user.email,
                subject:"Your Order Has Been Placed: Team Ecom",
                text:`
                     Hello ${user.name} 
                    Your Order Has Been Placed 
                    Shop more, Save more
                     Team:Ecom
                     `
               },(error)=>{
                console.log(error);
                
               })
            res.send({result:"Done", data:data,message:"Record is created, Successfully"})
    } catch (error) { 
        console.log(error);
       const errorMessage=[]
        error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
        error.errors?.subtotal ? errorMessage.push({subtotal:error.errors.subtotal.message}) : ""
        error.errors?.shipping ? errorMessage.push({shipping:error.errors.shipping.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
         }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Checkout.find().sort({_id:-1}).populate([
            {
                path:"user",
                select:"name maincategory subcategory brand color size finalPrice pic stockQuantity"
            },
            {
                path:"products.product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic  stockQuantity",
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
                options:{slice:{pic:1}},


            },

        ])
        res.send({result:"Done",count:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getAllUserRecords(req,res){
    
    try {
        const data  = await Checkout.find({user:req.params.userid}).sort({_id:-1}).populate([
            {
                path:"user",
                select:"name maincategory subcategory brand color size finalPrice pic stockQuantity"
            },
            {
                path:"products.product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic  stockQuantity",
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
                options:{slice:{pic:1}},
              },

        ])
        res.send({result:"Done",count:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    try {
        const data  = await Checkout.findOne({_id:req.params._id}).populate([
            {
                path:"user",
                select:"name maincategory subcategory brand color size finalPrice pic stockQuantity"
            },
            {
                path:"products.product",
                select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic  stockQuantity",
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
                options:{slice:{pic:1}},
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
        const data  = await Checkout.findOne({_id:req.params._id})
        if(data){
            data.orderStatus=req.body.orderStatus??data.orderStatus
            data.paymentStatus=req.body.paymentStatus??data.paymentStatus
            data.paymentMode=req.body.paymentMode??data.paymentMode
            data.rppid=req.body.rppid??data.rppid
            await data.save()
            let finalData = await Checkout.findOne({_id:data._id}).populate([
                {
                    path:"user",
                    select:"name maincategory subcategory brand color size finalPrice pic stockQuantity"
                },
                {
                    path:"products.product",
                    select:"name  maincategrory subcategory brand color size basePrice discount finalPrice pic  stockQuantity",
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
                    options:{slice:{pic:1}},
    
    
                },
    
            ])
         let user = finalData.user
            mailer.sendMail({
                from:process.env.MAIL_SENDER,
                to:user.email,
                subject:"Status of Your Order Has Been Changed: Team Ecom",
                text:`
                     Hello ${user.name} 
                    Status of Your Order Has Been Changed 
                    Your Order Status : ${req.body.orderStatus}
                     Team:Ecom
                     `
               },(error)=>{
                console.log(error);
                
               })
        res.send({result:"Done", data:finalData,message:"Record Updated, Successfully"})  
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
        const data  = await Checkout.findOne({_id:req.params._id})
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
    deleteRecord,
    getAllUserRecords
}



