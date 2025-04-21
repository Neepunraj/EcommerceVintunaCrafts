"use client";

import { GlobalContext } from "@/context";
import { getAllCartITems } from "@/services/cart";
import React, { Fragment, useContext, useEffect } from "react";
import CommonModal from "../commonModal";

async function CartModal() {
  const {
    user,
    cartItems,
    setCartItems,
    setShowCartModal,
    showCartModal,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  async function extractAllCartITems() {
    const res = await getAllCartITems(user._id);
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
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }
  useEffect(() => {
    if (user !== null) extractAllCartITems();
  }, [user]);
  return (
    <CommonModal
      showModalTitle={true}
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={cartItems && cartItems.length ? <ul>hello</ul> : null}
      buttonComponent={<Fragment>button</Fragment>}
    />
  );
}

export default CartModal;
