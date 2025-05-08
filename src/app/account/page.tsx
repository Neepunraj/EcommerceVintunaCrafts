"use client";
import InputComponent from "@/component/formElements/inputComponent";
import ComponentLevelLoader from "@/component/loader/componentlevel";
import Notification from "@/component/Notification";
import { GlobalContext, initialAddress } from "@/context";
import {
  LoginFormControls,
  NextResponseProps,
  ShippingAddressType,
} from "@/interfaces";
import {
  addNewAddress,
  deleteAddres,
  fetchAllAddress,
  updataAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { loginFormcontrols } from "../../utils/index";

interface Props {}
type formDatart = keyof LoginFormControls;
const intialLogin: LoginFormControls = {
  id: "",
  type: "",
  placeholder: "",
  label: "",
  componentType: "",
};
function Page(props: Props) {
  const {
    user,
    pagelevelLoader,
    addresses,
    setAddresses,
    addressFromData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [currentEditedAddressID, setCurrentEditedAdressID] = useState<
    string | null
  >(null);
  const [addressFromData1, setAddressFormData1] =
    useState<LoginFormControls>(intialLogin);
  const router = useRouter();
  async function extractAllAdress() {
    setPageLevelLoader(false);
    const res = await fetchAllAddress(user._id);

    if (res.success) {
      setPageLevelLoader(false);
      setAddresses(res.data);
    } else {
      setPageLevelLoader(false);
    }
  }

  async function handleAddorUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressID !== null
        ? await updataAddress({
            ...addressFromData,
            _id: currentEditedAddressID,
          })
        : await addNewAddress({ ...addressFromData, userID: user?._id });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, { position: "top-right" });
      setAddressFormData(initialAddress);
      setCurrentEditedAdressID(null);
      extractAllAdress();
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
      setAddressFormData(initialAddress);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  function handleUpdateAddress(getCurrentAddress: ShippingAddressType) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.city,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    if (getCurrentAddress._id) {
      setCurrentEditedAdressID(getCurrentAddress._id);
    }
  }

  async function handleDeleteAddress(getId: string) {
    setComponentLevelLoader({ loading: true, id: getId });
    const res: NextResponseProps = await deleteAddres(getId);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: getId });
      toast.success(res.message, { position: "top-right" });
      extractAllAdress();
    } else {
      setComponentLevelLoader({ loading: false, id: getId });
      toast.error(res.message, { position: "top-right" });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAdress();
  }, [user]);

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* we have to render random user image here */}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user.name}
              </h4>
              <p>{user.name}</p>
              <p>{user.role}</p>
            </div>
            <button
              onClick={() => router.push("/orders")}
              className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses :</h1>
              {pagelevelLoader ? (
                <PulseLoader
                  color={"#000000"}
                  loading={pagelevelLoader}
                  size={15}
                  data-testid="loader"
                />
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {addresses && addresses.length ? (
                    addresses.map((item) => (
                      <div className="" key={item._id}>
                        <p>Name : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className="mt-5 mr-5 bg-black text-white inline-block px-5 py-3 text-xs font-medium tracking-wide uppercase"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(item._id!)}
                          className="mt-5 mr-5 bg-black text-white inline-block px-5 py-3 text-xs font-medium tracking-wide uppercase"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                              text="Deleting"
                              color="#ffffff"
                            />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No Address Found Please Add a New Address</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="mt-5">
                <div className="w-full mt-6 mr-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map(
                    (controlITem: LoginFormControls) => (
                      <InputComponent
                        key={controlITem.id}
                        type={controlITem.type}
                        placeholder={controlITem.placeholder}
                        label={controlITem.label}
                        value={addressFromData1[controlITem.id as formDatart]}
                        onChange={(event) =>
                          setAddressFormData({
                            ...addressFromData,
                            [controlITem.id]: event.target.value,
                          })
                        }
                      />
                    )
                  )}
                </div>
                <button
                  onClick={handleAddorUpdateAddress}
                  className="mt-5 inline-block text-white text-xs font-medium uppercase  bg-black tracking-wide px-5 py-3"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}

export default Page;
