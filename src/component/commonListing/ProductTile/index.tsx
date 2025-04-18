import { productType } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

function ProductTile({ item }: productType) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52 ">
        <img
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 "
          alt="product Image"
          src={item.imageUrl}
        />
      </div>

      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}

      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex flex:row md:flex  md:flex-row lg:flex  lg:flex-row">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >
            {`$ ${item.price}`}
          </p>
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold text-red-700">
              {`$ ${(item.price - (item.price * item.priceDrop) / 100).toFixed(
                2
              )}`}
            </p>
          ) : null}
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold">
              {`-(${item.priceDrop}%)off`}
            </p>
          ) : null}
        </div>
        <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </div>
  );
}

export default ProductTile;
