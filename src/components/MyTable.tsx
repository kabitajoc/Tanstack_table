// src/components/ProductTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

interface Product {
  title: string;
  price: number;
  description: string;
  createdAt: string;
}

const columnHelper = createColumnHelper<Product>();
const columns = [
  {
    accessorKey: "id",
    header: "HEADER ID",
  },
  {
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
];

function MyTable() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product[]>("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableInstance = useReactTable({
    columns: columns,
    data: data, // Add your data here
  });

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {tableInstance.getHeaderGroups().map((headerElem) => (
            <tr key={headerElem.id} style={{ borderBottom: "2px solid #ccc" }}>
              {headerElem.headers.map((columnEl) => (
                <th
                  key={columnEl.id}
                  style={{
                    padding: "8px",
                    background: "#f2f2f2",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {flexRender(
                    columnEl.column.columns.header,
                    columnEl.getContext()
                  )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr key={row.id} style={{ borderBottom: "1px solid #ccc" }}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={cell.getCellProps().key}
                      style={{
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
