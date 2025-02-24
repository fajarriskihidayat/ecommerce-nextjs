"use client";

import { useFilter } from "@/hooks/useFilter";
import { ProductStock } from "@prisma/client";
import { ChangeEvent } from "react";

interface RadioItemProps {
  id: string;
  value: string;
  type: "stock";
  defaulChecked?: boolean;
}

const RadioItem = ({ id, value, type, defaulChecked }: RadioItemProps) => {
  const { setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "stock":
        setFilter({
          stock: (e.target.value as ProductStock) ?? "",
        });
        break;
      default:
        break;
    }
  };

  return (
    <label htmlFor={value} className="font-semibold flex items-center gap-3">
      <input
        type="radio"
        name={type}
        value={id}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-full checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        onChange={onChange}
        defaultChecked={defaulChecked}
      />
      <span>{value}</span>
    </label>
  );
};

export default RadioItem;
