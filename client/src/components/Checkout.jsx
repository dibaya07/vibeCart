import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export default function Checkout() {
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
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + Number(item.price) * (item.quantity || 1),
        0
      )
    : 0;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/`);
      if (response.data.success) {
        alert("order placed");

        setCartItemIds([]);
        setCartItems([]);
        setError("");
        navigate("/submit");
      }
    } catch (error) {
      console.log(error);
      setError("something is wrong try again ");
    }
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
      {!checkout && (
        <div className="bg-[#ebebeb] flex flex-col w-full lg:w-1/2  mx-auto p-4">
          <h1 className=" text-[#10367d] mx-auto px-10 py-5 text-xl lg:text-3xl font-semibold">
            Checkout Page
          </h1>
          <hr className="bg-[#10367d] h-0.5" />
          <ul className="gap-3 flex flex-col w-11/12 mx-auto items-end">
            {cartItems.map((item) => (
              <li key={item.id} className="pr-4">
                <span>
                  {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                </span>
              </li>
            ))}
            <hr className="bg-[#10367d] h-0.5 w-full" />
            <span className="text-lg font-medium pr-4">
              Total : {totalPrice.toFixed(2)}
            </span>
          </ul>
          <button
            onClick={() => setCheckout(true)}
            className="bg-[#10367d] text-white px-6 py-3 mx-auto mt-6 mb-3"
          >
            Checkout
          </button>
        </div>
      )}

      {checkout && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#ebebeb] flex flex-col w-full lg:w-1/2 mx-auto items-start gap-2 p-6 rounded-lg"
        >
          <label htmlFor="name" className="text-lg ">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            required={true}
            className="w-full p-2 border border-gray-700 border-solid rounded-lg"
          />
          <label htmlFor="email" className="text-lg mt-3">
            Email
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            id="email"
            required={true}
            className="w-full p-2 border border-gray-700 border-solid rounded-lg"
          />
          <label htmlFor="number" className="text-lg mt-3">
            Contact number
          </label>
          <input
            type="text"
            placeholder="Enter your contact number"
            id="number"
            required={true}
            className="w-full p-2 border border-gray-700 border-solid rounded-lg"
          />
          <label htmlFor="address" className="text-lg mt-3">
            Address
          </label>
          <textarea
            placeholder="address"
            id="address"
            required={true}
            className="w-full p-2 border border-gray-700 border-solid rounded-lg"
          ></textarea>
          <button className="bg-[#148700] px-10 py-3 my-2 rounded-lg mx-auto text-white ">
            Place order
          </button>
          <button
            onClick={() => setCheckout(false)}
            className="cursor-pointer bg-yellow-400  px-6 py-4 rounded-md mx-auto"
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
}
