import express from "express";
import {
  getCartProducts,
  removeAllFromCart,
  addToCart,
  updateQuanity,
} from "../controllers/cart.controller.js";
import { proudctRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", proudctRoute, getCartProducts);
router.post("/", proudctRoute, addToCart);
router.delete("/", proudctRoute, removeAllFromCart);
router.put("/:id", proudctRoute, updateQuanity);

export default router;
