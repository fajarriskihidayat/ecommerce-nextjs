import React from "react";
import CheckboxItem from "./CheckboxItem";

const FilterStock = () => {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Stocks</p>
      {/* <label className="font-semibold flex items-center gap-3">
        <input
          type="radio"
          name="stock"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-full checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>All</span>
      </label> */}
      <CheckboxItem type="stock" id={"ready"} value="Ready Stock" />
      <CheckboxItem type="stock" id={"preorder"} value="Pre Order" />
    </div>
  );
};

export default FilterStock;
