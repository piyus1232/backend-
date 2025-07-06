import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import {upload} from "../middlewares/multer.middleware.js"
import { uploadfilecloudnary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.models.js";
const registerUser = asyncHandler(async(req,res)=>{
 const {username,password,email,fullname}   = req.body
 if(fullname===""){
    throw new ApiError(401,"full name is required")

 }
 else if(password===""){
    throw new ApiError(401,"password is required")

 }
  else if(username===""){
    throw new ApiError(401,"username is required")

 }
  else if(email===""){
    throw new ApiError(401,"email is required")

 }
 else{
 

 const existeduser=await User.findOne({
    $or:[{username},{email}]
})
if(existeduser){
      throw new ApiError(409,"user already exists with this email and username")
}

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(req.files);
  
//   console.log(avatarLocalPath);
  
  if (!avatarLocalPath) {
   throw new ApiError(400,"avatar is required")
  }
    const avatar=  await uploadfilecloudnary(avatarLocalPath)
    console.log(avatar);
    
    
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    
 const user=await User.create({
    email,fullname,avatar:avatar.url, password,username:username.toLowerCase()

})
const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createduser, "User registered Successfully")
    )
 }


// console.log("form data showing",{email,fulname});

 





})
export {registerUser}