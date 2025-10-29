import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className=" bg-[#148700] rounded-lg text-white flex flex-col gap-4 font-semibold text-xl p-4 mx-auto justify-center items-center w-full lg:w-1/2 my-5">
      <h1>Congratulations</h1>
      <span>Your order placed </span>
      <button
        onClick={handleClick}
        className="cursor-pointer bg-yellow-400  px-6 py-4 rounded-md mx-auto text-black text-lg font-medium"
      >
        Back to Home
      </button>
    </div>
  );
}
