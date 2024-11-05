import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB =  async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`);
        console.log(`DB connected ! host: ${connectionInstance.connection.host}`)
    }catch(error){
        console.log("DB connection problem", error);
        process.exit(1);
    }
}

export default connectDB;