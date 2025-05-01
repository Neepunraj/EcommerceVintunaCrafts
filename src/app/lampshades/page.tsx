import CommonListing from "@/component/commonListing";
import { NextResponseProps } from "@/interfaces";
import { productByCategory } from "@/services/product";

const Lampshades = async () => {
  const lampshadeListings: NextResponseProps = await productByCategory(
    "lampshades"
  );

  return <CommonListing data={lampshadeListings && lampshadeListings.data} />;
};

export default Lampshades;
