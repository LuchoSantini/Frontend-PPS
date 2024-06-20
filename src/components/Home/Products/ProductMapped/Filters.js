import {
  CaretRightOutlined,
  DeleteOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Collapse, Popover } from "antd";
import React, { useEffect, useState } from "react";
import CustomFilters from "./CustomFilters";
import {
  getMCategories,
  getMColours,
  getMSizes,
} from "../../../Api/ApiServices";

function Filters({ onFilterSelected, onSetSortMethod, setSelectedFilters }) {
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState();
  const [colours, setColours] = useState();
  const [categories, setCategories] = useState();

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onSetSortMethod("default");
  };

  useEffect(() => {
    const getSizesFilter = async () => {
      try {
        const resSize = await getMSizes();
        const resColour = await getMColours();
        const resCategory = await getMCategories();
        setSizes(resSize.data);
        setColours(resColour.data);
        setCategories(resCategory.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSizesFilter();
  }, []);

  const genres = [
    { id: 1, description: "Hombre" },
    { id: 2, description: "Unisex" },
    { id: 3, description: "Mujer" },
  ];
  const getItems = () => [
    {
      key: "1",
      label: "Talle",

      children: (
        <div>
          <CustomFilters
            filterType="size"
            filters={sizes}
            onFilterSelected={onFilterSelected}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Categoria",
      children: (
        <p>
          <CustomFilters
            filterType="category"
            filters={categories}
            onFilterSelected={onFilterSelected}
          />
        </p>
      ),
    },
    {
      key: "3",
      label: "Color",
      children: (
        <div>
          <CustomFilters
            filterType="colour"
            filters={colours}
            onFilterSelected={onFilterSelected}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: "Genero",
      children: (
        <div>
          <CustomFilters
            filterType="genre"
            filters={genres}
            onFilterSelected={onFilterSelected}
          />
        </div>
      ),
    },
  ];

  const content = (
    <div style={{ color: "black" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = "#8ba0a5";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = "black";
        }}
      >
        <p onClick={clearFilters}>Limpiar Filtros</p>
        <DeleteOutlined style={{ fontSize: 20 }} />
      </div>

      <Collapse
        bordered={true}
        defaultActiveKey={["0"]}
        style={{ width: 320, background: "#a7bee42e", color: "#fff" }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </div>
  );

  return (
    <div>
      <Popover
        placement="bottom"
        trigger="click"
        content={content}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            cursor: "pointer",
            width: 180,
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "#abbec4";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "black";
          }}
        >
          <p>FILTRAR</p>
          <SlidersOutlined style={{ fontSize: 20 }} />
        </div>
      </Popover>
    </div>
  );
}

export default Filters;
