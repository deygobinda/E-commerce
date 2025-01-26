import express from "express";
import { proudctRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/create-checkout-session", proudctRoute, createCheckoutSession);

router.post("/checkout-success" ,proudctRoute  , checkoutSuccess )



export default router;
