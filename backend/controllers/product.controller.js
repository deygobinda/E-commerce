import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      Products: products,
    });
  } catch (error) {
    console.log("Error while getting all products :", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // len function returns javascript object rather than mongoDM document
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      res.status(401).json({ message: "No featured product found" });
    }
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controllers", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResposce = null;
    if (image) {
      cloudinaryResposce = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResposce?.secure_url
        ? cloudinaryResposce.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(401).json({ message: "Product not found" });
    }
    if (product.image) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        console.log("Error while deleting image from cloudinary", error);
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json("Product deleted successfully");
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).JSON({ message: "Server error", error: error.message });
  }
};

export const getRecommendedProduct = async (res, req) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProduct ", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductByCategory", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatedFeaturedProductCache = async () => {
  try {
    const featuredProduct = await Product.find({ isFeatured: true });
    await redis.set("featured_products", JSON.stringify(featuredProduct));
  } catch (error) {
    console.log("Error in updated cache function")
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updatedFeaturedProductCache();
      res.json(updatedProduct);
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
