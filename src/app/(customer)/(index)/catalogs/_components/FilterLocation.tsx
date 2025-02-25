import { getLocations } from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import React from "react";
import CheckboxItem from "./CheckboxItem";

const FilterLocation = async () => {
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Location</p>
      {locations.map((item, i) => (
        <CheckboxItem
          key={i}
          id={item.id.toString()}
          value={item.name}
          type="location"
        />
      ))}
    </div>
  );
};

export default FilterLocation;
