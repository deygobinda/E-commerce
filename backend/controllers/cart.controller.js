import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    //add quantity for each products
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => (cartItem.product = product.id)
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();
    return res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product != productId
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuanity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.Product === productId
    );
    if (!existingItem) {
      res.status(404).json({ message: "Product not found " });
    } else {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.Product !== productId
        );
        await user.save();
        return res.json(user.cartItems);
      } else {
        existingItem.quantity = quantity;
        await user.save();
        res.json(user.cartItems);
      }
    }
  } catch (error) {
    console.log("Error in updateQuanity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
