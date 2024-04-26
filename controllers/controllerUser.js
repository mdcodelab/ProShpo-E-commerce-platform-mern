import User from "../models/userModel.js";
import {notFound, errorHandler} from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";

//auth user & get the token
//POST api/users/auth
//public
const authUser = async (req, res) => {
const {email, password}=req.body;
const user = await User.findOne({email});
if(user && (await user.matchPassword(password))) {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
    //set jwt as Http cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30*24*60*60*1000  //30days in mill.sec
    })
    res.json({id: user._id, name: user.name, email: user.email, 
        password: user.password, isAdmin: user.isAdmin})
} else {
    res.status(401).json({message: "Invalid email or password"});
}
}


//register user
//POST api/users - we create a new user
//public
const registerUser = async (req, res) => {
    res.send("Register user");
}


//logout user / clear cookie
//POST api/users/logout
//private
const logoutUser = async (req, res, next) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logged out successfully."});
}

//get user profile
//GET api/users/profile
//public
const getUserProfile = async (req, res) => {
    res.send("Get user profile");
}

//update user profile
//PUT api/users/profile   (we do not use the id, because we use token)
//private
const updateUserProfile = async (req, res) => {
    res.send("Update user profile");
}

//get all users (admin)
//GET api/users 
//Privater/admin
const getUsers = async (req, res) => {
    res.send("Get users");
}

//get user by id (admin)
//GET api/users/:id 
//Privater/admin
const getUserById = async (req, res) => {
    res.send("Get user by id");
}

//delete users (admin)
//DELETE api/users/:id
//Privater/admin
const deleteUsers = async (req, res) => {
    res.send("Delete users");
}

//update user (admin)
//PUT api/users/:id 
//Privater/admin
const updateUser = async (req, res) => {
    res.send("Update user");
}

export {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserById, deleteUsers, updateUser}

