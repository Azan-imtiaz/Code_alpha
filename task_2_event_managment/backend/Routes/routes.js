const express=require("express");
const {handleGet,addInterest,fetchInterest,RegisterUser,loginUser,verifyToken,createPost,fetchPosts} =require("../controllers/cont");
const router=express.Router();

router.get("/",handleGet);
router.post("/registerUser",RegisterUser);
router.post("/loginUser",loginUser);
router.post("/verifyToken",verifyToken);
router.post("/createPost",createPost);
router.post("/fetchPosts",fetchPosts);
router.post("/addInterest",addInterest);
router.post("/fetchInterest",fetchInterest);


module.exports=router;