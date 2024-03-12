import mongoose from "mongoose";

const dbUrl = process.env.MONGODB_URL

const dbConnect = async() => {
    try{
        await mongoose.connect(dbUrl)
    } catch(error){
        throw new Error("Database connection error", error)
    }
}
 
const dbDisconnect = async() => {
    try {
        await mongoose.disconnect()
    } catch(error){
        throw new error("Error in disconnection database", error)
    }
}

export {dbConnect, dbDisconnect}