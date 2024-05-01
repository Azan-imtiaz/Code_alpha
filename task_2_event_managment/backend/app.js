require("dotenv").config();
require("./conn/conn");
const express=require("express");
const app=express();
const router=require("./Routes/routes");
const cookieParser = require("cookie-parser");
const cors=require("cors");
const P=process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router)
app.listen(P,()=>{
    console.log(`Server started at port ${P}`);
})