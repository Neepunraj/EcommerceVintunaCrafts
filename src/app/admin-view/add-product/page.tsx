"use client";
import InputComponent from "@/component/formElements/inputComponent";
import SelectComponent from "@/component/formElements/selectComponent";
import TileComponent from "@/component/formElements/TileComponent";
import Notification from "@/component/Notification";
import { ProductDataType } from "@/interfaces";
import { adminAddProductformControls, AvailableSizes } from "@/utils";
import { FC, useState } from "react";

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
const AdminAddNewProduct: FC = () => {
  const [formData, setformData] = useState<ProductDataType>(initialFormdata);

  function handleImage() {}
  function handleClick() {}
  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 ml-0 space-y-8">
          <input accept="image/*" max="1000000" type="file" />
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
                label={controlItem.label}
                placeholder={controlItem.placeholder}
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
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
