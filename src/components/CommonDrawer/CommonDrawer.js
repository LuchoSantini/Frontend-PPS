import { CloseOutlined } from "@ant-design/icons";
import { Drawer, Space } from "antd";
import ProductSearch from "../Home/Products/ProductSearch";

const CommonDrawer = ({
  title,
  placement,
  open,
  openCart,
  setOpen,
  setOpenCart,
  products,
}) => {
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
              onClick={() => {
                setOpen(false);
                setOpenCart(false);
              }}
              style={{ fontSize: "16px", cursor: "pointer", marginLeft:5 }}
            />
          </div>
        ) : (<div>CARRITO</div>)
      }
      closeIcon={false}
      placement={placement}
      onClose={() => {
        setOpen(false);
        setOpenCart(false);
      }}
      style={{ zIndex: 1001 }}
      open={placement === "left" ? open : openCart}
    ></Drawer>
  );
};

export default CommonDrawer;
