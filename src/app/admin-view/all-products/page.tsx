import CommonListing from "@/component/commonListing";
import { getAllAdminProducts } from "@/services/product";
import { FC } from "react";

const AllProduct: FC = async () => {
  const allAdminProducts = await getAllAdminProducts();

  return <CommonListing data={allAdminProducts && allAdminProducts.data} />;
};
export default AllProduct;
