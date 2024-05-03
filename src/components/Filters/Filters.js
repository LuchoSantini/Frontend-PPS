import { SlidersOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

function Filters() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "auto",
          padding: 40,
        }}
      >
        <div style={{ display: "flex", gap: 8, cursor: "pointer" }}>
          <SlidersOutlined style={{ fontSize: 20 }} />
          <p>FILTRAR</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p>ORDENAR</p>
          <Select
            defaultValue="Mas vendidos"
            style={{
              width: 130,
            }}
            options={[
              {
                value: "high",
                label: "Mayor precio",
              },
              {
                value: "low",
                label: "Menor precio",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
