import { getCategories } from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import React from "react";
import CheckboxItem from "./CheckboxItem";

const FilterCategory = async () => {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Category</p>
      {categories.map((item, i) => (
        <CheckboxItem
          key={i}
          id={item.id.toString()}
          value={item.name}
          type="category"
        />
      ))}
    </div>
  );
};

export default FilterCategory;
