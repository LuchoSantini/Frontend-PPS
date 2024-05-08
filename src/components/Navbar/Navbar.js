import React, { useState } from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import CommonDrawer from "../CommonDrawer/CommonDrawer";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [title, setTitle] = useState();
  const [placement, setPlacement] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const showDrawerSearch = () => {
    setOpen(true);
    setTitle("Buscar productos");
    setPlacement("left");
  };

  const showDrawerCart = () => {
    setOpenCart(true);
    setTitle("Carrito de compra");
    setPlacement("right");
  };

  const items = [
    {
      label: <a href="/admin"> Admin </a>,
      key: "0",
    },
    {
      label: <a href="/asd"> Mi Cuenta </a>,
      key: "1",
    },
  ];

  return (
    <div>
      {isMobile ? (
        <div style={{}}>
          <div
            style={{
              paddingRight: 0,
              paddingLeft: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <SearchOutlined
                style={{ fontSize: 30 }}
                onClick={showDrawerSearch}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <p style={{ fontSize: 18 }}>RSS</p>
              </Link>
            </div>
            <div style={{ gap: 5, display: "flex" }}>
              <Dropdown
                placement="bottomRight"
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <UserOutlined
                  style={{ fontSize: 30 }}
                  className="buttons-navbar"
                />
              </Dropdown>
              <ShoppingCartOutlined
                style={{ fontSize: 30 }}
                onClick={showDrawerCart}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            alignItems: "center",
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <SearchOutlined
              style={{ fontSize: 30 }}
              onClick={showDrawerSearch}
              className="buttons-navbar"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <p style={{ fontSize: 18 }}>RSS</p>
            </Link>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <UserOutlined
                style={{ fontSize: 30 }}
                className="buttons-navbar"
              />
            </Dropdown>

            <div>
              <ShoppingCartOutlined
                style={{ fontSize: 30 }}
                onClick={showDrawerCart}
                className="buttons-navbar"
              />
            </div>
          </div>
        </div>
      )}

      <CommonDrawer
        title={title}
        placement={placement}
        open={open}
        onClose={() => {
          setOpen(false);
          setOpenCart(false);
        }}
        openCart={openCart}
        setOpenCart={setOpenCart}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Navbar;
