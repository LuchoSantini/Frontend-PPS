import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMediaQuery, Button } from "@mui/material";
import CommonDrawer from "../CommonDrawer/CommonDrawer";
import { Link } from "react-router-dom";
import Home from "../Home/Home";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [title, setTitle] = useState();
  const [placement, setPlacement] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigation = useNavigate();

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

  const adminPageClickHandler = () => {
    navigation("/admin");
  };

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
                <div style={{ marginRight: 2 }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/lzgmgrnn.json"
                    trigger="hover"
                    style={{ width: 40, height: 40 }}
                  ></lord-icon>
                </div>
              </Link>
              <p style={{ fontSize: 18 }}>RSS</p>
            </div>
            <div style={{ gap: 5, display: "flex" }}>
              <UserOutlined style={{ fontSize: 30 }} />
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
              <div style={{ marginRight: 10 }}>
                <lord-icon
                  src="https://cdn.lordicon.com/lzgmgrnn.json"
                  trigger="hover"
                  style={{ width: 40, height: 40 }}
                ></lord-icon>
              </div>
            </Link>
            <p style={{ fontSize: 18 }}>RSS</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Button onClick={adminPageClickHandler}>ADMIN</Button>
            <UserOutlined style={{ fontSize: 30 }} className="buttons-navbar" />
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
