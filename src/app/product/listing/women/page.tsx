import CommonListing from "@/component/commonListing";
import { NextResponseProps } from "@/interfaces";
import { productByCategory } from "@/services/product";
import React from "react";

async function WomenAllProducts() {
  const getCatagoryData: NextResponseProps = await productByCategory("women");

  return <CommonListing data={getCatagoryData && getCatagoryData.data} />;
}

export default WomenAllProducts;
