let jwt = require("jsonwebtoken")


function verifyAdmin(req,res,next){
let token = req.headers.authorization
console.log(token)
if(token && jwt.verify(token,process.env.JWT_SECRET_KEY_BUYER)){
    next()
}
else
res.send({result:"Fail",reason:"You Are Not An Authorized User to Access this Api"})
}

module.exports={
    verifyAdmin
}



