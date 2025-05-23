const nodemailer = require("nodemailer")

const mailer = nodemailer.createTransport({
           
    host:"smtp.gmail.com",
    port:587,
    tls:true,
    auth:{
        "user":process.env.USER_EMAIL,
        "pass":process.env.USER_PASS
    }


})

module.exports=mailer