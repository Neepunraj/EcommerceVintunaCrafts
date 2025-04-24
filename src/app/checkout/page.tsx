"use client";
import Notification from "@/component/Notification";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface Props {}

function Checkout(props: Props) {
  const { cartItems, addresses, setAddresses } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderprocessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrDerSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [cartItems]);

  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 ">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.productID.imageUrl}
                    alt={item.productID.name}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="font-semibold">
                      ${item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="">Your cart is Empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
          <p>Shipping Address Details</p>
          <p>Complete you order by selcting address below</p>
          <div className="">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                  key={item._id}
                >
                  <p>Name: {item.fullName}</p>
                  <p>Address : {item.address}</p>
                  <p>City {item.city}</p>
                  <p>Country {item.country}</p>
                  <p>Postal code {item.postalCode}</p>
                  <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select a address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No Address Added</p>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Add New Address{" "}
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">SubTotal</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => total + item.productID.price,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => total + item.productID.price,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <button className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                Checkout
              </button>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    </>
  );
}

export default Checkout;
