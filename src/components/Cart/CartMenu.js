// src/components/CartMenu/CartMenu.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button, List, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { removeItem, clearCart } from "../../redux/cartActions";

const CartMenu = ({ open, onClose }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Función para agrupar los items por nombre, color y tamaño (talle)
  const groupItemsByColorAndSize = () => {
    const groupedItems = {};

    items.forEach((item) => {
      const key = `${item.name}-${item.color}-${item.sizeId}`;

      if (!groupedItems[key]) {
        groupedItems[key] = {
          ...item,
        };
      }
    });

    return Object.values(groupedItems);
  };

  const groupedItems = groupItemsByColorAndSize();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item)); // Envía el objeto completo del item a eliminar
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Drawer
      title="CARRITO"
      placement="right"
      onClose={onClose}
      visible={open}
      closeIcon={<CloseOutlined />}
      width={400}
      style={{ zIndex: 1001 }}
    >
      <List
        dataSource={groupedItems}
        renderItem={(item) => (
          <List.Item
            key={`${item.name}-${item.color}-${item.sizeId}`} // Clave única basada en nombre, color y tamaño
            actions={[
              <Button type="link" onClick={() => handleRemoveItem(item)}>
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`${item.name} - ${item.color} - Talle ${item.sizeId}`} // Mostrar el tamaño específico
              description={`Cantidad: ${item.quantity} | Precio: $${item.price}`}
            />
          </List.Item>
        )}
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary" onClick={handleClearCart}>
          Limpiar Carrito
        </Button>
      </Space>
    </Drawer>
  );
};

export default CartMenu;
