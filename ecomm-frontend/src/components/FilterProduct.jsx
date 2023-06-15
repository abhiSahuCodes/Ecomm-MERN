import React from "react";
import { GiFruitBowl } from "react-icons/gi";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5  rounded-full shadow-lg cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-blue-200"}`}>
        <GiFruitBowl />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>

  );
};

export default FilterProduct;
