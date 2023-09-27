import * as React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
  }),
  columnHelper.accessor("price", {
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor("category.name", {
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("images", {
    cell: (info) => <img src={info.getValue()[1]} alt="" />,
    header: () => <span>Images</span>,
  }),
];

function Example() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(false);
      });
  }, []);

  const table = useReactTable<Product>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
}
export default Example;
