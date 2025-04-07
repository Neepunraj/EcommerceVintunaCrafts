"use client";
import React from "react";
import Notification from "../Notification";
import ProductTile from "./ProductTile";
import ProductButton from "./commonButton";
import { Product } from "@/interfaces";

interface dataProps {
  data: Product[];
}
const CommonListing = ({ data }: dataProps) => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item: Product) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;
