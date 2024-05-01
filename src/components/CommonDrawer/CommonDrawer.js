import { CloseOutlined } from "@ant-design/icons";
import { Drawer, Space } from "antd";

const CommonDrawer = ({
  title,
  placement,
  open,
  openCart,
  setOpen,
  setOpenCart,
}) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      closable={false}
      onClose={() => {
        setOpen(false);
        setOpenCart(false);
      }}
      open={placement === "left" ? open : openCart}
      extra={
        <Space>
          <CloseOutlined
            onClick={() => {
              setOpen(false);
              setOpenCart(false);
            }}
            style={{ paddingLeft: 10 }}
          />
        </Space>
      }
    >
      {placement === "left" ? (
        null
      ) : (
        <div>
          <p>Product 423 $$$ cant:</p>
        </div>
      )}
    </Drawer>
  );
};

export default CommonDrawer;
