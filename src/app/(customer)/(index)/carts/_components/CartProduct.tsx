"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import Link from "next/link";

const CartProduct = () => {
  const { products, incrementQuantity, decrementQuantity, removeProduct } =
    useCart();

  return (
    <div
      id="cart"
      className="container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]"
    >
      {products.length === 0 ? (
        <Link href="/catalogs" className="text-center">
          <button className="w-52 p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white hover:opacity-60">
            Go to Shop
          </button>
        </Link>
      ) : (
        products.map((item, i) => (
          <div
            key={i}
            className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]"
          >
            <div className="flex items-center w-[340px] gap-5">
              <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
                <img
                  src={item.thumbnail}
                  className="w-full h-full object-contain"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">{item.name}</p>
                <p className="text-sm text-[#616369]">{item.category_name}</p>
              </div>
            </div>
            <div className="w-[150px] flex flex-col gap-1">
              <p className="text-sm text-[#616369]">Price</p>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                {rupiahFormat(item.price)}
              </p>
            </div>
            <div className="w-[120px] flex flex-col gap-1">
              <p className="text-sm text-[#616369]">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="w-6 h-6 flex shrink-0"
                  onClick={() => decrementQuantity(item.id)}
                >
                  <img src="assets/icons/minus-cirlce.svg" alt="minus" />
                </button>
                <p className="text-[#0D5CD7] font-semibold leading-[22px]">
                  {item.quantity}
                </p>
                <button
                  type="button"
                  className="w-6 h-6 flex shrink-0"
                  onClick={() => incrementQuantity(item.id)}
                >
                  <img src="assets/icons/add-circle.svg" alt="plus" />
                </button>
              </div>
            </div>
            <div className="w-[150px] flex flex-col gap-1">
              <p className="text-sm text-[#616369]">Total</p>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                {rupiahFormat(item.price * item.quantity)}
              </p>
            </div>
            <button
              type="button"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
              onClick={() => removeProduct(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartProduct;
