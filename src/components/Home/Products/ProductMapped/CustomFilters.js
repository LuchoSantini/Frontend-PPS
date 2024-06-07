import { Spin } from "antd";
import React from "react";

function CustomFilters({ filters, filterType, onFilterSelected }) {
  console.log(filters);
  return (
    <div>
      {filters ? (
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            color: "black",
          }}
        >
          {filters.map((filter) => (
            <p
              key={filter.id}
              value={filter.id}
              style={{
                display: "flex",
                cursor: "pointer",
                border: "1px solid #e5e5e5",
                borderRadius: 5,
                alignItems: "center",
                width: 100,
                justifyContent: "center",
                transition:"all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#8ba0a5";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "black";
              }}
              onClick={() => onFilterSelected(filterType, filter.description)}
            >
              {filter.description}
            </p>
          ))}
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default CustomFilters;
