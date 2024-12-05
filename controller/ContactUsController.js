const ContactUs = require("../model/ContactUs")
const mailer = require("../mailer")
async function createRecord(req,res){
    try {
        const data = new ContactUs(req.body)
        data.date = new Date()
        await data.save()

        mailer.sendMail({
            from:process.env.EMAIL_SENDER,
            to:data.email,
            subject:"Your Query Has Been Recieved:Team Ecom",
            text:`
                 Hello ${data.name} 
                 Your Query Has Been Recieved
                Our Team Will Contact You Soon
                 Team:Ecom
                 `
           },(error)=>{
            console.log(error);
            
           })

           mailer.sendMail({
            from:process.env.EMAIL_SENDER,
            to:process.env.MAIL_SENDER,
            subject:"New Query Has Been Recieved:Team Ecom",
            html:`
                  Name       : ${data.name}
                  Email      : ${data.email}
                  Phone      : ${data.phone}
                  Subject    : ${data.subject}
                  Message    : ${data.message}
                 `
           },(error)=>{
            console.log(error);
            
           })
        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
       const errorMessage=[]
        error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
        error.errors?.email ? errorMessage.push({email:error.errors.email.message}) : ""
        error.errors?.phone ? errorMessage.push({phone:error.errors.phone.message}) : ""
        error.errors?.subject ? errorMessage.push({subject:error.errors.subject.message}) : ""
        error.errors?.message ? errorMessage.push({message:error.errors.message.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await ContactUs.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await ContactUs.findOne({_id:req.params._id})
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
        const data  = await ContactUs.findOne({_id:req.params._id})
        if(data){
            data.active=req.body.active??data.active
            await data.save()

            mailer.sendMail({
                from:process.env.EMAIL_SENDER,
                to:data.email,
                subject:"Your Query Has Been Resolved:Team Ecom",
                text:`
                     Hello ${data.name} 
                     Your Query Has Been Resolved
                    If You More Query then feel free contact us  again
                     Team:Ecom
                     `
               },(error)=>{
                console.log(error);
                
               })
        res.send({result:"Done",message:"Record Updated, Successfully"})  
               }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function deleteRecord(req,res){
    try {
        const data  = await ContactUs.findOne({_id:req.params._id})
        if(data){
          if(data.active){
            res.send({result:"Fail" ,reason:"Can't Delete Active Contact Us Query"})
          }
          else{
            await data.deleteOne()
            res.send({result:"Done",reason:"Record is Deleted"})  
          }
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



