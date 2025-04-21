import CommonDetails from "@/component/commonDetails";
import { productById } from "@/services/product";
import React from "react";

async function ProductDetails({ params }: any) {
  const dataId = await params;
  const getdata = await productById(dataId?.details);
  return <CommonDetails item={getdata && getdata.data[0]} />;
}

export default ProductDetails;
