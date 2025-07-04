import ComponentLevelLoader from "@/component/loader/componentlevel";
import { GlobalContext } from "@/context";
import { Product, productType } from "@/interfaces";
import { addtoCart } from "@/services/cart";
import { DeleteProduct, updateProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const ProductButton = ({ item }: productType) => {
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    setProductToUpdate,
    setShowCartModal,
    user,
  } = useContext(GlobalContext);
  const pathname = usePathname();
  const isAdminView = pathname.includes("admin-view");
  const router = useRouter();

  async function handleDeleteProduct(itemID: string) {
    setComponentLevelLoader({
      loading: true,
      id: itemID,
    });
    const res = await DeleteProduct(itemID);
    if (res.success) {
      setComponentLevelLoader({
        loading: false,
        id: item._id,
      });
      toast.success(res.message, { position: "top-right" });
      router.refresh();
    } else {
      toast.error(res.message, { position: "top-right" });
      setComponentLevelLoader({
        loading: false,
        id: item._id,
      });
    }
  }
  async function handleAddToCart(item: Product) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await addtoCart({
      productID: item._id,
      userID: user._id,
    });
    if (res.success) {
      toast.success(res.message, { position: "top-right" });
      setShowCartModal(true);
      setComponentLevelLoader({ loading: false, id: item._id });
    } else {
      toast.error(res.message, { position: "top-right" });
      setComponentLevelLoader({ loading: false, id: item._id });
    }
  }
  return (
    <>
      {isAdminView ? (
        <>
          <button
            onClick={() => {
              setProductToUpdate(item);
              router.push("/admin-view/add-product");
            }}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteProduct(item._id)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            {componentLevelLoader &&
            componentLevelLoader.loading &&
            item._id === componentLevelLoader.id ? (
              <ComponentLevelLoader
                text={"Deleting Product"}
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              "Delete"
            )}
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            handleAddToCart(item);
          }}
          className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        >
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader
              text={"Adding to Cart "}
              color={"#ffffff"}
              loading={
                componentLevelLoader &&
                componentLevelLoader.loading &&
                componentLevelLoader.id === item._id
              }
            />
          ) : (
            "Add to Cart"
          )}
        </button>
      )}
    </>
  );
};

export default ProductButton;
