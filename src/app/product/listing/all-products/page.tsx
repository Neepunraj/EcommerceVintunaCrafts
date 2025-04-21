import CommonListing from "@/component/commonListing";
import { getAllAdminProducts } from "@/services/product";
import React from "react";

async function AllProduct() {
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}

export default AllProduct;
