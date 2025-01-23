import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/products",productRoutes)
app.listen(PORT , ()=>{
    console.log(`Server is runnig on http://localhost:${PORT}`)
    connectDB()
}) 