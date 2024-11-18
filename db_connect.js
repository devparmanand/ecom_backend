const mongoose  = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/wd-10am-august-24_server")

// .then(()=>{
//     console.log("Database is Connected");
    
// })
// .catch((error)=>{
//     console.log(error);
    
// })

async function getConnect(){
    
 await   mongoose.connect("mongodb://localhost:27017/wd-10am-august-24_Server")

.then(()=>{
    console.log("Database is Connected");
    
})
.catch((error)=>{
    console.log(error)
})
}
getConnect()


// wd-10am-august-24
