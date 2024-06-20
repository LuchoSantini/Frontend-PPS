// src/components/CartIcon/CartIcon.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartMenu from "./CartMenu";

const CartIcon = () => {
  const [open, setOpen] = useState(false);
  const items = useSelector((state) => state.cart.items);

  // Calcular la cantidad total de ítems en el carrito sumando las cantidades de cada producto
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={showDrawer}
      >
        <ShoppingCartOutlined style={{ fontSize: 30 }} />
        {totalItems > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {totalItems}
          </div>
        )}
      </div>
      <CartMenu open={open} onClose={onClose} />
    </>
  );
};

export default CartIcon;
