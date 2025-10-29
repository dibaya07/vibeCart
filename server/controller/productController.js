const Product = require("../models/product");
const axios = require("axios");

const getProducts = async (req, res) => {
  try {
    const productsInDB = await Product.find();
    if (productsInDB.length > 0) {
      console.log("Products from database");
      return res.json(productsInDB);
    }

    console.log("product from external api ");
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=10"
    );
    const data = response.data;

    const productsToSave = data.map(
      ({ id, title, price, category, image }) => ({
        id,
        title,
        price,
        quantity: 1,
        category,
        image,
      })
    );

    await Product.insertMany(productsToSave);
    return res.json(productsToSave);
  } catch (error) {
    console.log(error, "getProducts error");
    return res.json("error getproducts");
  }
};

module.exports = { getProducts };
