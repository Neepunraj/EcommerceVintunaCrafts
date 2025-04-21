import ComponentLevelLoader from "@/component/loader/componentlevel";
import { GlobalContext } from "@/context";
import { Product, productType } from "@/interfaces";
import { DeleteProduct, updateProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const ProductButton = ({ item }: productType) => {
  const { componentLevelLoader, setComponentLevelLoader, setProductToUpdate } =
    useContext(GlobalContext);
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
        <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader
              text={"Adding to Cart "}
              color={"#ffffff"}
              loading={componentLevelLoader && componentLevelLoader.loading}
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
