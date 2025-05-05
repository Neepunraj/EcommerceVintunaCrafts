"use client";
import ComponentLevelLoader from "@/component/loader/componentlevel";
import { GlobalContext } from "@/context";
import {
  NextResponseOrderDetailsProps,
  OrderDetailsDataType,
} from "@/interfaces";
import { getAllOrdersforAllUsers, updateStatusOfOrder } from "@/services/order";
import React, { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const AdminView = () => {
  const {
    user,
    pagelevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
    setAllOrdersFroAllUsers,
    allOrdersForAllUsers,
  } = useContext(GlobalContext);

  async function extractOrdersForAllUser() {
    const res: NextResponseOrderDetailsProps = await getAllOrdersforAllUsers();
    setPageLevelLoader(true);
    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersFroAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user?._id !== user?._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }
  async function handleUpdateOrderStatus(getItem: OrderDetailsDataType) {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const res: NextResponseOrderDetailsProps = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: getItem._id });
      extractOrdersForAllUser();
    } else {
      setComponentLevelLoader({ loading: false, id: getItem._id });
    }
  }
  useEffect(() => {
    if (user !== null) extractOrdersForAllUser();
  }, [user]);
  if (pagelevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pagelevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <section>
      <div className="mx-auto px:4 sm:px-6 lg:px:8">
        <div className="">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => (
                    <li
                      className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      key={item._id}
                    >
                      <div className="flex">
                        <h1 className="font-bold text-lg mb-3 flex-1">
                          #order : {item._id}
                        </h1>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className=" text-sm font-semibold text-gray-900">
                              {item.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Email :
                            </p>
                            <p className=" text-sm font-semibold text-gray-900">
                              {item.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Amount Paid
                            </p>
                            <p className=" text-sm font-semibold text-gray-900">
                              {item.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.orderItems?.map((item) => (
                          <div className="shrink-0" key={item._id}>
                            <img
                              src={item.product.imageUrl}
                              alt=""
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                            />
                            <div className="p">{item.qty} pcs</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-5">
                        <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                          {item.isProcessing
                            ? "Order is Processing"
                            : " Order is Delviered"}
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(item)}
                          className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          disabled={!item.isProcessing}
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"Updating Order Status"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Update Order Status"
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminView;
