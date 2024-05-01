const mongoose=require("mongoose");
 const Database=process.env.Database;
mongoose.connect(Database).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(`Error while connected to database ${err}`)
})