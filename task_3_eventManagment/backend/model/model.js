const mongoose=require("mongoose");
const validator = require("validator");
const  Schema=mongoose.Schema({
    username:String,
    password:String,
    email: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return validator.isEmail(value);
          },
          message: "Invalid email",
        },
        unique:true
      }
});


const postSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  createdBy:{
    type:String,
    required:true
  },
  interestedPeople:[String]

});

const postModel=new mongoose.model("postModel",postSchema);






const userSchema=mongoose.model("userSchema",Schema);

module.exports={userSchema,postModel};
