import express from "express"
import { proudctRoute } from "../middleware/auth.middleware.js";
import { getCoupon , validateCoupon} from "../controllers/coupon.controller.js";

const router = express.Router()


router.get("/" ,proudctRoute ,  getCoupon);
router.get("/validate" ,proudctRoute ,  validateCoupon);


export default router