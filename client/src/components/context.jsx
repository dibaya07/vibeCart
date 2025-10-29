import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItemIds, setCartItemIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState("")

  const allProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(response.data || []);
    } catch (error) {
      console.log("front error ", error);
      setError("something is wrong try again")
    }
  };

  const cartIds = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/ids`);
      if (response.data.success) {
        setCartItemIds(response.data.productIds || []);
      }
    } catch (error) {
      console.log("front error ", error);
      setError("something is wrong try again")
    }
  };
  useEffect(() => {
    allProducts();
    cartIds();
  }, []);

     useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError("");
          }, 4000);
          return () => clearTimeout(timer);
        }
      }, [error]);
  

  return (
    <AuthContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartItemIds,
        setCartItemIds,
        checkout,
        setCheckout,
        error, setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
