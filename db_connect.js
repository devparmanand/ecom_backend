const mongoose  = require("mongoose")

const DB_URI= process.env.DB_URI

async function getConnect(){
    
//  await   mongoose.connect(process.env.DB_URI)
 await   mongoose.connect(DB_URI)
.then(()=>{
    console.log("Database is Connected");
    
})
.catch((error)=>{
    console.log(error)
})
}
getConnect()



