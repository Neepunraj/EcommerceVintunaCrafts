import CommonListing from "@/component/commonListing";
import { NextResponseProps, Product } from "@/interfaces";
import { productByCategory } from "@/services/product";
import React from "react";

async function MenAllProducts() {
  const menProductsAll: NextResponseProps = await productByCategory("men");

  return <CommonListing data={menProductsAll && menProductsAll.data} />;
}

export default MenAllProducts;
