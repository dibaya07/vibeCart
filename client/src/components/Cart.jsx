import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Checkout from "./Checkout";

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    setCartItemIds,
    checkout,
    setCheckout,
    error,
    setError,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`);
      const data = response.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log("cart fetch error", error);
      setCartItems([]);
      setError("unable to get data try again");
    }
  };
  useEffect(() => {
    cartProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/${productId}`
      );
      if (response.data.success) {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        setCartItemIds((prev) => prev.filter((itemId) => itemId !== productId));
      }
    } catch (error) {
      console.log("delete error ", error);
      setError("unable to delete try again");
    }
  };

  const updateQty = async (id, quantity) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        quantity,
      });
      if (response.data.success) {
        setCartItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setError("unable to update try again");
    }
  };

  const handleDec = async (id, quantity) => {
    if (quantity > 1) {
      await updateQty(id, quantity - 1);
    }
  };

  const handleInc = async (id, quantity) => {
    await updateQty(id, quantity + 1);
  };

  const handleBack = () => {
    setCheckout(false);
    setError("");
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div>
      {error && <p className="text-red-700">{error}</p>}
      <h1 className="bg-[#10367d]  py-4 text-white font-semibold text-2xl tracking-widest rounded-md">
        Cart
      </h1>
      <div className=" flex justify-end my-3 ">
        <button
          className="cursor-pointer bg-yellow-400  px-6 py-4 rounded-md"
          onClick={handleBack}
        >
          Back to Home
        </button>
      </div>
      {cartItems.length === 0 ? (
        <h1>no item added</h1>
      ) : (
        <>
          {!checkout && (
            <ul className=" p-5 flex gap-5 flex-wrap items-center justify-center ">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="bg-[#ebebeb]  w-80 h-[26rem] flex flex-col items-start p-3 gap-2 rounded-xl "
                >
                  <div className=" flex flex-col items-center justify-center w-full h-1/2 p-2">
                    <img src={item.image} alt="image" className="w-24 h-24" />
                    <span className="font-light text-[10px]">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-center w-full">
                    {item.title}
                  </span>
                  <div className=" flex-1 flex flex-col lg:flex-row justify-between items-center w-full px-6 py-4">
                    <span className="font-bold text-xl my-1">
                      &#8377; {Number(item.price).toFixed(2)}
                    </span>
                    <div className="flex gap-5 text-2xl h-fit my-1 lg:my-0">
                      <button onClick={() => handleDec(item.id, item.quantity)}>
                        -
                      </button>
                      <button>{item.quantity}</button>
                      <button onClick={() => handleInc(item.id, item.quantity)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer bg-[#a30310] text-white  px-6 py-4 rounded-md mx-auto "
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Checkout />
        </>
      )}
    </div>
  );
}
