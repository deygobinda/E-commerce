import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"   

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/coupons",couponRoutes)
app.use("/api/payments",paymentRoutes)
app.listen(PORT , ()=>{
    console.log(`Server is runnig on http://localhost:${PORT}`)
    connectDB()
}) 