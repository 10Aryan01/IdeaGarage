import mongoose from "mongoose";

let is_connected=false

export const connectToDb= async ()=>
{
    mongoose.set('strictQuery',true)

    if(is_connected)
    {
        console.log("Database is connected ");
        return;
    }
    try {
        await mongoose.connect("mongodb+srv://loganreignq123:euboEyE4CJcGxiVR@nextjscluster.kbpudml.mongodb.net/?retryWrites=true&w=majority",{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        is_connected=true;
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Error in connecting to the database") 
    }
}