"use client";

import { useFilter } from "@/hooks/useFilter";
import { ChangeEvent } from "react";

interface CheckboxItemProps {
  id: string;
  value: string;
  type: "stock" | "brand" | "location" | "category";
}

const CheckboxItem = ({ id, value, type }: CheckboxItemProps) => {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "brand":
        if (e.target.checked) {
          setFilter({
            brands: [
              ...(filter?.brands ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            brands: filter?.brands?.filter(
              (val) => val !== Number.parseInt(e.target.value)
            ),
          });
        }
        break;

      case "category":
        if (e.target.checked) {
          setFilter({
            categories: [
              ...(filter?.categories ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            categories: filter?.categories?.filter(
              (val) => val !== Number.parseInt(e.target.value)
            ),
          });
        }
        break;

      case "location":
        if (e.target.checked) {
          setFilter({
            locations: [
              ...(filter?.locations ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            locations: filter?.locations?.filter(
              (val) => val !== Number.parseInt(e.target.value)
            ),
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <label htmlFor={value} className="font-semibold flex items-center gap-3">
      <input
        type="checkbox"
        value={id}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        onChange={onChange}
      />
      <span>{value}</span>
    </label>
  );
};

export default CheckboxItem;
