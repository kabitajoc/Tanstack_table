// import * as React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
// } from "@tanstack/react-table";

// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
// };

// function Example() {
//   const [data, setData] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [limit, setLimit] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [titleFilter, setTitleFilter] = useState("Generic");
//   const [priceMinFilter, setPriceMinFilter] = useState(900);
//   const [priceMaxFilter, setPriceMaxFilter] = useState(1000);

//   const fetchData = () => {
//     const apiUrl = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}&title=${titleFilter}&price_min=${priceMinFilter}&price_max=${priceMaxFilter}`;
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [offset, limit, titleFilter, priceMinFilter, priceMaxFilter]);

//   useEffect(() => {
//     const newCurrentPage = Math.floor(offset / limit) + 1;
//     setCurrentPage(newCurrentPage);
//   }, [offset, limit]);

//   const handleNextPage = () => {
//     setOffset(offset + limit);
//     setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (offset - limit >= 0) {
//       setOffset(offset - limit);
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const columnHelper = createColumnHelper();

//   const columns = [
//     columnHelper.accessor("id", {
//       header: "Id",
//     }),
//     columnHelper.accessor("title", {
//       header: "Title",
//     }),
//     columnHelper.accessor("description", {
//       header: () => "Description",
//     }),
//     columnHelper.accessor("price", {
//       header: () => <span>Price</span>,
//     }),
//     columnHelper.accessor("category.name", {
//       header: () => <span>Name</span>,
//     }),
//     columnHelper.accessor("images", {
//       cell: (info) => (
//         <img src={info.getValue()[0]} alt="" width="100" height="100" />
//       ),
//       header: () => <span>Images</span>,
//     }),
//   ];

//   const table = useReactTable<Product>({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   const changeLimit = (e) => {
//     setLimit(e.target.value);
//     setOffset(0);
//   };

//   const handleTitleFilterChange = (e) => {
//     setTitleFilter(e.target.value);
//   };

//   const handlePriceMinFilterChange = (e) => {
//     setPriceMinFilter(e.target.value);
//   };

//   const handlePriceMaxFilterChange = (e) => {
//     setPriceMaxFilter(e.target.value);
//   };

//   return (
//     <div className="w3-container p-2">
//       <div className="filter-container">
//         <label htmlFor="titleFilter">Title:</label>
//         <input
//           type="text"
//           id="titleFilter"
//           value={titleFilter}
//           onChange={handleTitleFilterChange}
//         />
//         <label htmlFor="priceMinFilter">Min Price:</label>
//         <input
//           type="number"
//           id="priceMinFilter"
//           value={priceMinFilter}
//           onChange={handlePriceMinFilterChange}
//         />
//         <label htmlFor="priceMaxFilter">Max Price:</label>
//         <input
//           type="number"
//           id="priceMaxFilter"
//           value={priceMaxFilter}
//           onChange={handlePriceMaxFilterChange}
//         />
//         <button onClick={fetchData}>Apply Filters</button>
//       </div>
//       <table className="w3-table-all">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className=" float-left">
//         <label htmlFor="limitSelect">Items per Page: </label>
//         <select id="limitSelect" onChange={changeLimit} value={limit}>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//         </select>
//         <div>
//           <button onClick={handlePreviousPage} disabled={offset === 0}>
//             ◀️
//           </button>
//           <span>Page {currentPage}</span>
//           <button onClick={handleNextPage}>▶️</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Example;
