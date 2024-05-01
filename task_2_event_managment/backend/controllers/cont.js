const { userSchema,postModel } = require("../model/model");

const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

 const SECRET_KEY=process.env.SECRET_KEY;
 

 function handleGet(req, res) {
    res.send("AZAN 2");
};


 async function RegisterUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const checkAlreadyExist = await userSchema.findOne({ email });
        if (checkAlreadyExist) {
            return res.status(200).json({ st: 409, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userSchema.create({ username, email, password: hashedPassword });

        if (!user) {
            return res.status(200).json({ st: 500, message: "Failed to create user" });
        }

       
        return res.status(200).json({ st: 201, message: "User created successfully" });

    } catch (e) {
        console.error(e);
        return res.status(200).json({ st: 501, message: "Internal server error" });
    }
}



async function loginUser(req, res) {
    try {
       
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        console.log(user);
        console.log(user.username)
        if (!user) {
            return res.status(200).json({ st: 300, message: "No account with this email" });
        }
       
        const check = await bcrypt.compare(password, user.password);

        if (check) {

            // Generate JWT token
        
            const token = jwt.sign({ email:email,password:password },SECRET_KEY  ); 
            
            // Set the token as a cookie in the response
            res.cookie('token', token,{HttpOnly:"true"}); 
            return res.status(200).json({ st: 200, message: "Right credentials",token:token ,"username":user.username});
        }
        return res.status(200).json({ st: 600, message: "Wrong credentials" });

    } catch (e) {
        console.log(e);
        res.status(200).send({ st: 700, message: "Internal server error" });
    }
}

async function verifyToken(req, res) {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(200).json({ st: 300, message: "No token" });
        }

        const result = await jwt.verify(token, SECRET_KEY);
        console.log(result);

        if (result) {
            return res.status(200).json({ st: 200, message: "Correct token", username: result.email});
        }
        return res.status(200).json({ st: 300, message: "Wrong token" });
    } catch (e) {
        console.log(e);
        return res.status(200).json({ st: 500, message: "Internal server error" });
    }
}


    
async function createPost(req,res){
   try{
   
    let rqq=req.body;
       let post=await postModel.create({
        title:rqq.title,
        description:rqq.description,
        createdBy:rqq.createdBy,
        date:rqq.date,
        time:rqq.time,
       });
       console.log(post);
       res.status(200).json({st:200,message:"post created"});
   }catch(e){
    console.log(e)
    res.status(200).json({st:300,message:"post not created"});
   }
}


 async function fetchPosts(req,res){
  try{
    const posts=await postModel.find();
    console.log(posts);
   res.status(200).json({"st":200,"arr":posts});

  }  
  catch(e){
  console.log(e)
  res.status(200).json({"st":300,"arr":posts});

} 
}


async function addInterest(req, res) {
    try {
      const id = req.body.id;
       const userId = req.body.username; // Assuming you have the userId you want to add to the interestedPeople array
  
      // Update the document by pushing the userId to the interestedPeople array
      const result = await postModel.findByIdAndUpdate(id, { $push: { interestedPeople: userId } });
      
      if (!result) {
        return res.status(404).json({ status: 404, message: "Post not found" });
      }
    console.log("result"+ result);
      // Send a success response
      return res.status(200).json({ status: 200, message: "Interest added successfully" });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({ status: 500, message: "Internal server error" });
  
    }
  }


 async  function fetchInterest(req,res){
        try{
            let id=req.body.id;
            const post = await postModel.findById(id);

            if (!post) {
              return res.status(404).json({ status: 404, message: "Post not found" });
            }
        
            // Extract the interestedPeople array from the post document
            const interestedPeople = post.interestedPeople;
           

            // Send the interestedPeople array as the response
            return res.status(200).json({ status: 200, interestedPeople });
        }   
        catch(e){

        }   
 }

module.exports = { handleGet,fetchInterest, RegisterUser,loginUser,verifyToken ,createPost,fetchPosts,addInterest};
