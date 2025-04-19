"use client";
import InputComponent from "@/component/formElements/inputComponent";
import SelectComponent from "@/component/formElements/selectComponent";
import TileComponent from "@/component/formElements/TileComponent";
import ComponentLevelLoader from "@/component/loader/componentlevel";
import Notification from "@/component/Notification";
import { GlobalContext } from "@/context";
import { ProductDataType } from "@/interfaces";
import { AddNewPrdocut, updateProduct } from "@/services/product";
import { adminAddProductformControls, AvailableSizes } from "@/utils";
import { useRouter } from "next/navigation";
import { FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";

const initialFormdata: ProductDataType = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};
type formatDataKeys = keyof ProductDataType;

async function helperForUploadingImageTOFireBase(file: any) {}

const AdminAddNewProduct: FC = () => {
  const [formData, setformData] = useState<ProductDataType>(initialFormdata);
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    productToUpdate,
    setProductToUpdate,
  } = useContext(GlobalContext);

  const router = useRouter();
  async function handleImage(event) {}

  function handleClick() {}
  async function handleAddProduct() {
    setComponentLevelLoader({
      loading: true,
      id: "",
    });
    const res =
      productToUpdate !== null
        ? await updateProduct(formData)
        : await AddNewPrdocut(formData);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });
      setformData(initialFormdata);
      setProductToUpdate(null);
      setTimeout(() => {
        router.push("/admin-view/all-product");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
  }
  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label> Available Sizes</label>
            {/* tilecomponent */}
            <TileComponent
              selected={formData.sizes}
              onClick={handleClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                key={controlItem.id}
                type={controlItem.type}
                label={controlItem.label}
                placeholder={controlItem.placeholder}
                onChange={(event) => {
                  setformData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
                value={formData[controlItem.id]}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                key={controlItem.id}
                label={controlItem.label}
                onChange={(event) => {
                  setformData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
                options={controlItem.options}
                value={formData[controlItem.id]}
              />
            ) : null
          )}
          <button
            onClick={handleAddProduct}
            className="bg-black text-white w-full items-center justify-center px-6 py-6 text-lg font-medium tracking-wide uppercase inline-flex"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={
                  productToUpdate !== null
                    ? "Updating Product"
                    : "Adding Product"
                }
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : productToUpdate !== null ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
