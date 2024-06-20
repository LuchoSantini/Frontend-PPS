// src/components/CommonDrawer/CommonDrawer.js
import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import ProductSearch from "../Home/Products/ProductSearch";

const CommonDrawer = ({ title, placement, open, setOpen, products }) => {
  return (
    <Drawer
      title={
        placement === "left" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ProductSearch products={products} setOpen={setOpen} />
            <CloseOutlined
              onClick={() => setOpen(false)}
              style={{ fontSize: "16px", cursor: "pointer", marginLeft: 5 }}
            />
          </div>
        ) : (
          <div>{title}</div>
        )
      }
      closeIcon={false}
      placement={placement}
      onClose={() => setOpen(false)}
      style={{ zIndex: 1001 }}
      open={open}
    ></Drawer>
  );
};

export default CommonDrawer;
