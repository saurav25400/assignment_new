const bcrypt=require('bcrypt');
const UserModel=require('../model/user.model.js');
const jwt=require('jsonwebtoken');
const { use } = require('../routes/user.routes.js');
const signup=async(req,res,next)=>{
    try {
        const {name,dob,email,password}=req.body;
        if(!name||!dob||!email||!password){
            return res.json({message:"please provide all the details"});
        }
        const hashedPasssword=await bcrypt.hash(password,10);
        const newUser=new UserModel({name,dob,email,password:hashedPasssword});
        const savedUser=await newUser.save();
        console.log(savedUser);
        if(savedUser._id){
            return res.status(201).json({success:true,message:"user registered successfully!!!"});
        }
        else{
            return res.status(400).json({success:false,message:"user registration failed!!"});
        }

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,message:"something is wrong!!"})
    }

}

const signin = async (req, res, next) => {
    try {
      const { name, password } = req.body;
  
      // Check if name and password are provided
      if (!name || !password) {
        return res.status(400).json({ message: "Invalid credentials!!!" });
      }
  
      // Find user by name
      const userExist = await UserModel.findOne({ name: name });
  
      // Check if user exists
      if (!userExist) {
        return res.status(400).json({ message: "User name does not exist!!" });
      }
  
      // Compare password
      const passwordMatch = await bcrypt.compare(password, userExist.password);
  
      // Check if password matches
      if (!passwordMatch) {
        return res.status(500).json({ message: "Password is incorrect" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: userExist._id, name: userExist.name },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' } // Optional: specify token expiration
      );
      console.log(token);
  
      // Set token as a cookie and send response
      res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully!!!",
        user: { name, email: userExist.email }
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Something went wrong!!" });
    }
  };

  const getUserInfo = async (req, res, next) => {
    try {
      const userData = await UserModel.find({});
      return res.status(200).json({ success: true, user: userData });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
  };  

module.exports={
    signup,
    signin,
    getUserInfo

}