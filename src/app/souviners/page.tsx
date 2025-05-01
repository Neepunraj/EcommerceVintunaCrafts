import CommonListing from "@/component/commonListing";
import { NextResponseProps } from "@/interfaces";
import { productByCategory } from "@/services/product";
import React from "react";

const Souviners = async () => {
  const SouvinersListings: NextResponseProps = await productByCategory(
    "souviners"
  );
  return <CommonListing data={SouvinersListings && SouvinersListings.data} />;
};

export default Souviners;
