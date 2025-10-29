import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/cart");
  };
  return (
    <div>
      <h1 className="bg-[#10367d] py-4 lg:py-6 text-white font-semibold text-xl lg:text-2xl tracking-widest rounded-md">
        VibeCart
      </h1>
      <div className=" flex justify-end my-3 ">
        <button
          className="cursor-pointer bg-yellow-400 px-4 lg:px-6 py-2 lg:py-4 rounded-md"
          onClick={handleClick}
        >
          Cart
        </button>
      </div>
    </div>
  );
}
