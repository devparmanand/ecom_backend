const path = require("path")
const Product = require("../model/Product")
const Newsletter = require("../model/Newsletter")
const mailer = require("../mailer")
async function createRecord(req,res){
    try {
        const data = new Product(req.body)
        if(req.files){
            data.pic = Array.from(req.files).map((x)=>x.path)
        }
        await data.save()

        
        let findData = await Product.findOne({_id:data._id})
                .populate([
                    {
                        path:"maincategory",
                        select:"name -_id"
                    },

                    {
                        path:"subcategory",
                        select:"name -_id"
                    },

                    {
                        path:"brand",
                        select:"name -_id"
                    },
                ])

        const   newsaletter= await Newsletter.find()    
        newsaletter.forEach((x)=>{
            mailer.sendMail({
                from:process.env.MAIL_SENDER,
                to:x.email,
                subject:"Checkout Our Latest Products:Team Ecom",
                text:`
                     Hello ${data.name}
                     Checkout Our Latest Products
                     Team:Ecom
                     `
               },(error)=>{
                console.log(error);
                
               })
        })  
        res.send({result:"Done", data:findData ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
        
       const errorMessage=[]
       
        error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
        error.errors?.maincategory ? errorMessage.push({maincategory:error.errors.maincategory.message}) : ""
        error.errors?.subcategory ? errorMessage.push({subcategory:error.errors.subcategory.message}) : ""
        error.errors?.brand ? errorMessage.push({brand:error.errors.brand.message}) : ""
        error.errors?.color ? errorMessage.push({color:error.errors.color.message}) : ""
        error.errors?.size ? errorMessage.push({size:error.errors.size.message}) : ""
        error.errors?.basePrice ? errorMessage.push({basePrice:error.errors.basePrice.message}) : ""
        error.errors?.discount ? errorMessage.push({discount:error.errors.discount.message}) : ""
        error.errors?.finalPrice ? errorMessage.push({finalPrice:error.errors.finalPrice.message}) : ""
        error.errors?.stock ? errorMessage.push({stock:error.errors.stock.message}) : ""
        error.errors?.stockQuantity ? errorMessage.push({stockQuantity:error.errors.stockQuantity.message}) : ""
        error.errors?.description ? errorMessage.push({description:error.errors.description.message}) : ""
        error.errors?.pic ? errorMessage.push({pic:error.errors.pic.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Product.find().sort({_id:-1})
        .populate([
            {
                path:"maincategory",
                select:"name -_id"
            },

            {
                path:"subcategory",
                select:"name -_id"
            },

            {
                path:"brand",
                select:"name -_id"
            },
        ])
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Product.findOne({_id:req.params._id})
        .populate([
            {
                path:"maincategory",
                select:"name -_id"
            },

            {
                path:"subcategory",
                select:"name -_id"
            },

            {
                path:"brand",
                select:"name -_id"
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
        const data  = await Product.findOne({_id:req.params._id})
        if(data){
            data.name=req.body.name??data.name
            data.maincategory=req.body.maincategory??data.maincategory
            data.subcategory=req.body.subcategory??data.subcategory
            data.brand=req.body.brand??data.brand
            data.color=req.body.color??data.color
            data.size=req.body.size??data.size
            data.basePrice=req.body.basePrice??data.basePrice
            data.discount=req.body.discount??data.discount
            data.finalPrice=req.body.finalPrice??data.finalPrice
            data.stock=req.body.stock??data.stock
            data.stockQuantity=req.body.stockQuantity??data.stockQuantity
            data.description=req.body.description??data.description
            data.active=req.body.active??data.active
            if(req.files){
                try {
                    // const fs = require("fs")
                    // fs.unlinkSync(data.pic)

                } catch (error) {}
                data.pic = data.pic.concat(req.files.map((x)=>x.path))

            }

            await data.save()
            let findData = await Product.findOne({_id:data._id})
            .populate([
                {
                    path:"maincategory",
                    select:"name -_id"
                },

                {
                    path:"subcategory",
                    select:"name -_id"
                },

                {
                    path:"brand",
                    select:"name -_id"
                },
            ])
        res.send({result:"Done",data:findData,message:"Record Updated, Successfully"})  
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
        const data  = await Product.findOne({_id:req.params._id})
        if(data){
            try {
                    const fs = require("fs")
                    data.pic.forEach((x)=>fs.unlinkSync(x))
                    } catch (error) {}
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



