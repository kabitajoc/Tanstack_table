// src/components/ProductTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";

interface Product {
  title: string;
  price: number;
  description: string;
  createdAt: string;
}

function ProductTable() {
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Creation Date",
        accessor: "createdAt",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Product>({
      columns,
      data,
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table
        {...getTableProps()}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ borderBottom: "2px solid #ccc" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "8px",
                    background: "#f2f2f2",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ borderBottom: "1px solid #ccc" }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
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

export default ProductTable;
