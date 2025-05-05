import CommonListing from "@/component/commonListing";
import { getAllAdminProducts } from "@/services/product";
import React from "react";
import { NextResponseProps } from "../../../../interfaces/index";

async function AllProduct() {
  const getAllProducts: NextResponseProps = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}

export default AllProduct;
