import mongoose from "mongoose"

export const connectDB = async () =>{
   try{
    const cnn =  await mongoose.connect(process.env.MONGODB_URL)
    console.log(cnn.connection.host)
   }catch(error){
        console.log(`Error connection to mongoDb : ${error.message}`)
        process.exit(1) // 1 - failure and 0 - success
   }
}