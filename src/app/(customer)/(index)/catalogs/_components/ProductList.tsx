"use client";

import React from "react";
import CardProduct from "../../_components/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/data";
import { useFilter } from "@/hooks/useFilter";

const ProductList = () => {
  const { filter } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["product-list", filter],
    queryFn: () => fetchProducts(filter),
  });

  return (
    <div
      className={`grid ${
        isLoading || data?.length === 0 ? "grid-cols-1" : "grid-cols-3"
      }  gap-[30px]`}
    >
      {isLoading ? (
        <span className="text-center">Loading...</span>
      ) : data && data.length > 0 ? (
        data?.map((item, i) => <CardProduct key={i} item={item} />)
      ) : (
        <span className="text-center">Data not found</span>
      )}
    </div>
  );
};

export default ProductList;
