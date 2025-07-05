import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
 

cloudinary.config(
    { 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}
)
const uploadfilecloudnary =  async(filepath)=>{
    try{
        if(!filepath) return null;

    const response = await cloudinary.uploader.upload(filepath,{resource_type:"auto"})
      // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(error){
            
            console.log(error);
            fs.unlinkSync(localFilePath)
            return null;
            

    }


}
export {uploadfilecloudnary}