import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Products() {
  const navigate = useNavigate();
  const { products, cartItemIds, setCartItemIds ,error, setError} = useContext(AuthContext);

  const handleClick = async (productId) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
      id: productId,
    });
    if (response.data.success) {
      setCartItemIds((prev) => [...prev, productId]);
    }

    console.log(response);
    }catch(error){
      console.log(error)
      setError("unable to add item to cart ! try again")
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
      {error && <p className="text bg-red-600">{error}</p>}
      <ul className=" p-2 lg:p-5 flex gap-2 lg:gap-5 flex-wrap items-center justify-center">
        {products.map((item) => (
          <li
            key={item.id}
            className="bg-[#ebebeb]  w-80 h-[22rem] lg:h-[26rem] flex flex-col items-start p-3 gap-2 rounded-xl hover:border-[#10367d] hover:border-solid hover:border-b-2"
          >
            <div className=" flex flex-col items-center justify-center w-full h-1/3 lg:h-1/2 p-2">
              <img
                src={item.image}
                alt="image"
                className="w-18 h-20 lg:w-24 lg:h-24"
              />
              <span className="font-light text-[10px]">{item.category}</span>
            </div>
            <div className=" flex-1 flex flex-col justify-between w-full">
              <span className=" text-base lg:text-lg font-semibold">
                {item.title}
              </span>
              <span className="font-bold text-xl">&#8377; {item.price}</span>
              <button
                className={` px-10 py-3 my-2 rounded-xl mx-auto text-white ${
                  cartItemIds.includes(item.id)
                    ? "bg-[#148700]"
                    : "bg-[#10367d]"
                } `}
                onClick={() => {
                  if (cartItemIds.includes(item.id)) {
                    navigate("/cart");
                  } else {
                    handleClick(item.id);
                  }
                }}
              >
                {cartItemIds.includes(item.id) ? "Go to cart" : "Add to cart"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
