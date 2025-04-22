import CommonListing from "@/component/commonListing";
import { NextResponseProps, Product } from "@/interfaces";
import { productByCategory } from "@/services/product";
import React from "react";

async function KidsAllProducts() {
  const allProducts: NextResponseProps = await productByCategory("kids");

  return <CommonListing data={allProducts && allProducts.data} />;
}

export default KidsAllProducts;
