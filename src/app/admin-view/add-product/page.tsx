import Notification from "@/component/Notification";
import { FC } from "react";

const AdminAddNewProduct: FC = () => {
  function handleImage() {}
  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 ml-0 space-y-8">
          <input accept="image/*" max="1000000" type="file" />
          <div className="flex gap-2 flex-col">
            <label> Available Sizes</label>
            {/* tilecomponet */}
          </div>
          {}
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
