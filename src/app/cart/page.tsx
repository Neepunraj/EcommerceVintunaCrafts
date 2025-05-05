"use client";
import CommonCart from "@/component/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartITems } from "@/services/cart";
import React, { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

function Cart() {
  const {
    user,
    cartItems,
    setCartItems,
    pagelevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const res = await getAllCartITems(user?._id);
    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item: any) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem("cartITem", JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, []);
  async function handleDeleteCartItems(getCartItemID: string) {
    setComponentLevelLoader({
      loading: true,
      id: "",
    });

    const res = await deleteFromCart(getCartItemID);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, { position: "top-right" });
      extractAllCartItems();
    } else {
      toast.error(res.message, { position: "top-right" });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  /*   if (pagelevelLoader) {
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
  } */
  return (
    <CommonCart
      cartItems={cartItems}
      handleDeletCartItems={handleDeleteCartItems}
      componentLevelLoader={componentLevelLoader}
    />
  );
}

export default Cart;
