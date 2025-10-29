const Product = require("../models/product");
const Cart = require("../models/cart");

const getCartIds = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    const productIds = cartItems.map((item) => item.productId);
    return res.json({ success: true, productIds });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};
const getCartProducts = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    if (cartItems.length > 0) {
      const productIds = cartItems.map((item) => item.productId);
      const products = await Product.find({ id: { $in: productIds } });
      return res.json(products);
    }
    return res.json({ message: "No items " });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};

const cartProducts = async (req, res) => {
  try {
    const { id } = req.body;
    await Cart.create({ productId: id });
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log("cart error", error);
    res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};

const cartItemDelete = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteItem = await Cart.deleteOne({ productId: Number(productId) });
    if (deleteItem.deletedCount === 0) {
      return res.json({ success: false, message: "item not found" });
    }
    return res.json({ success: true, message: "item removed " });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};
const cartDelete = async (req, res) => {
  try {
    const deleteItem = await Cart.deleteMany({});

    return res.json({ success: true, message: "all item removed " });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};

const cartUpdate = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;
    const updatedItem = await Cart.findOneAndUpdate(
      { productId: Number(id) },
      { $set: { quantity } },
      { new: true }
    );
    res.json({ success: true, updatedItem });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "cart error", error: error.message });
  }
};

module.exports = {
  getCartIds,
  getCartProducts,
  cartProducts,
  cartItemDelete,
  cartDelete,
  cartUpdate,
};
