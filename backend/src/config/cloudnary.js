import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET,
    });

const uploadonCLOUDNARY = async (localFilePath) => {
  try {
    if(!localFilePath) return null;

    //we have to upload throw url.
    const response = await cloudinary.uploader.upload(localFilePath , {
      resource_type : "auto"
    })
    console.log("file upload successfully", response.url);
    //remove local file after upload 
      
    
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    return response;

  } catch (error) {
    //cleanup after fail to upload
    console.error("Cloudinary upload failed:", error);
    return null;
  }
}

export {uploadonCLOUDNARY}