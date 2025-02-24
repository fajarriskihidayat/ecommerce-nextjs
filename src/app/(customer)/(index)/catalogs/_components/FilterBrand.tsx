import { getBrands } from "@/app/(admin)/dashboard/(index)/brands/lib/data";
import React from "react";
import CheckboxItem from "./CheckboxItem";

const FilterBrand = async () => {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Brands</p>
      {brands.map((item, i) => (
        <CheckboxItem
          key={i}
          id={item.id.toString()}
          value={item.name}
          type="brand"
        />
      ))}
    </div>
  );
};

export default FilterBrand;
