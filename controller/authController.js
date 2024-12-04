import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js"; // Added .js extension
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address,userName,contry,gender ,phone,isAdmin } = req.body;

        if (!name) {
            return res.send({ message: 'Name is required' });
        }
        if (!email) {
            return res.send({ message: 'email is required' });
        }
        if (!password) {
            return res.send({ message: 'password is required' });
        }
        if (!address) {
            return res.send({ message: 'address is required' });
        }
        if (!userName) {
            return res.send({ message: 'username is required' });
        }
        if (!contry) {
            return res.send({ message: 'contry is required' });
        }
        if (!gender) {
            return res.send({ message: 'gender is required' });
        }
        if (!phone) {
            return res.send({ message: 'phone is required' });
        }

        // Existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered, please login'
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email,address,userName,gender,contry,phone,password: hashedPassword ,role: isAdmin ? 1 : 0}).save(); // Added await

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        });
    }
};

//post login
export const loginController = async (req, res) => {
    try {
        const { userName, password } = req.body;

      
        if (!userName || !password) {
            return res.status(404).send({
                success: false,
                message: "Email and password are required"
            });
        }

 
        const user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "username is not registered"
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate the JWT token
        const token = JWT.sign(
            { _id: user._id ,isAdmin: user.role === 1},
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        req.session.isLogin = true;
        req.session.user = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          id: user._id,
          isAdmin: user.role === 1
        };
       
        res.cookie('auth_token', token, {
            httpOnly: true, // This makes it inaccessible to client-side JS
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                phone:user.phone,
                email: user.email,
                phone: user.phone,
                address: user.address,
                id:user._id,
                isAdmin: user.role === 1
            },
            token,
        });
    } catch (error) {
        
        console.error("Error in login:", error);  // Log the error for debugging
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error: error.message || error // Provide error message
        });
    }
};

export const userLogout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send({ success: false, message: 'Failed to log out' });
        }
  
        // Clear the session cookie
        res.clearCookie('connect.sid');
        res.clearCookie('auth_token');
        res.status(200).send({ success: true, message: 'Logged out successfully' });
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send({ success: false, message: 'Server error during logout' });
    }
  };
  

export const userFind = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the 'id' is valid
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID' });
        }

        const user = await userModel.findById(id);
        // if (!user) {
        //     return res.status(404).send({ message: 'User not found' });
        // }
if(user){
res.send(user);
}
res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error' });
    }
};
//test controller
export const allUsers= async (req,res)=>{
try {
    const users=await userModel.find({})
    res.send(users)
} catch (error) {
    console.log(error);
    
}
}

export const blockUnblockUser= async (req,res)=>{
   
    try {
        
        
        const {id}=req.params
        const {isBlock}=req.body
       
      
        const user =await userModel.findById(id)

        user.isBlock=isBlock
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log(error);
    }
}