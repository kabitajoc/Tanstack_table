import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
};

function ProductTable() {
  const [data, setData] = useState<Product[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [priceMinFilter, setPriceMinFilter] = useState<number>(10);
  const [priceMaxFilter, setPriceMaxFilter] = useState<number>(1000);

  const fetchData = () => {
    axios
      .get<Product[]>(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}&price_min=${priceMinFilter}&price_max=${priceMaxFilter}&categoryId=1&title=${titleFilter}`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const debouncedFetchData = useCallback(
    _debounce(fetchData, 1000), // Debounce for 1 second
    [titleFilter, priceMinFilter, priceMaxFilter, offset, limit]
  );

  useEffect(() => {
    // Call the debounced fetchData function whenever filters or pagination change
    debouncedFetchData();

    // Clear the debounced timer when the component unmounts
    return () => {
      debouncedFetchData.cancel();
    };
  }, [debouncedFetchData]);

  const columnHelper = createColumnHelper<Product>();

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
      cell: (info) => (
        <img src={info.getValue()[0]} alt="" width="100" height="100" />
      ),
      header: () => <span>Images</span>,
    }),
  ];

  const table = useReactTable<Product>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNextPage = () => {
    setOffset(offset + limit);
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setOffset(Math.max(offset - limit, 0));
    setCurrentPage(currentPage - 1);
  };

  const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setOffset(0);
  };

  const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
  };

  const handlePriceMaxFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceMaxFilter(Number(e.target.value));
  };

  const handlePriceMinFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceMinFilter(Number(e.target.value));
  };

  return (
    <>
      <div className=" w3-container p-2">
        <div className="flex gap-5 mb-4">
          <label htmlFor="titleFilter">Title:</label>
          <input
            type="text"
            className=" border pl-4"
            id="titleFilter"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
          <label htmlFor="priceMinFilter">Min Price:</label>
          <input
            type="number"
            className=" border pl-4 w-20"
            id="priceMinFilter"
            value={priceMinFilter}
            onChange={handlePriceMinFilterChange}
          />
          <label htmlFor="priceMaxFilter">Max Price:</label>
          <input
            type="number"
            className=" border pl-4 w-20"
            id="priceMaxFilter"
            value={priceMaxFilter}
            onChange={handlePriceMaxFilterChange}
          />
        </div>
        <table className="w3-table-all">
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
        <div className="flex  justify-end items-end">
          <label htmlFor="limitSelect">Items per Page: </label>
          <select id="limitSelect" onChange={changeLimit} value={limit}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <div className="flex justify-center items-center ">
            <button onClick={handlePreviousPage} disabled={offset === 0}>
              ◀️
            </button>
            <span>{/* {currentPage}/{totalPages} */}</span>
            <button
              onClick={handleNextPage}
              //   disabled={offset + limit >= totalItems}
            >
              ▶️
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductTable;
