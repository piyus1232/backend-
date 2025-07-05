import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectdb = async ()=>{
    try {
         const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`DB connected  ${connectioninstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED",error);
      
        throw  error
    
        
    }

}
export default connectdb;