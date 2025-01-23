import express from "express";
import {
  deleteProduct,
  createProducts,
  getAllProducts,
  getFeaturedProducts,
  getRecommendedProduct,
  getProductByCategory,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, proudctRoute } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/", proudctRoute, adminRoute, getAllProducts);
route.get("/featured", getFeaturedProducts);
route.get("/category/:category", getProductByCategory);
route.post("/", proudctRoute, adminRoute, createProducts);
route.patch("/:id", proudctRoute, adminRoute, toggleFeaturedProduct);
route.get("/", proudctRoute, getRecommendedProduct);
route.delete("/:id", proudctRoute, adminRoute, deleteProduct);

export default route;
