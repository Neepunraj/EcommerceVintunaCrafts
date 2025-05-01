"use client";
import Notification from "@/component/Notification";
import { GlobalContext, initialAddress } from "@/context";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { callStripeSession } from "@/services/stripe";
import { fetchAllAddress } from "@/services/address";
import { ShippingAddressType } from "@/interfaces";

function Checkout() {
  const {
    cartItems,
    addresses,
    setAddresses,
    checkOutFormData,
    setCheckOutFormData,
    user,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderprocessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrDerSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [cartItems]);
  const publishableKey: string =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE || "";
  const stripePromise = loadStripe(publishableKey);

  async function handleCheckout() {
    const stripe = await stripePromise;
    console.log(cartItems);
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const res = await callStripeSession(createLineItems);
    console.log(publishableKey);
    console.log(res);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", "stripe");
    localStorage.setItem("checkoutFormData", JSON.stringify(checkOutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }

  async function getAlladdress() {
    const res = await fetchAllAddress(user._id);
    if (res.success) setAddresses(res.data);
  }

  function handleSelectedAddress(getAddress: ShippingAddressType) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckOutFormData({
        ...checkOutFormData,
        shippingAddress: initialAddress,
      });
      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckOutFormData({
      ...checkOutFormData,
      shippingAddress: {
        ...checkOutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }
  useEffect(() => {
    if (user._id !== null) getAlladdress();
  }, [user]);

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
                  className={`border p-6 mt-2 ${
                    item._id === selectedAddress
                      ? "bg-green-600 text-white"
                      : ""
                  }`}
                  key={item._id}
                >
                  <p>Name: {item.fullName}</p>
                  <p>Address : {item.address}</p>
                  <p>City {item.city}</p>
                  <p>Country {item.country}</p>
                  <p>Postal code {item.postalCode}</p>
                  <button
                    onClick={() => handleSelectedAddress(item)}
                    className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                  >
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
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkOutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
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
