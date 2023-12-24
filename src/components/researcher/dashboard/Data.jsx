"use client";
import { api } from "@/utils/api";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Search from "../Search";

const columns = [
  {
    accessorKey: "sn",
    header: "Serial Number",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ getValue }) => <p>{getValue().toUpperCase()}</p>,
  },
  {
    accessorKey: "last_seen",
    header: "Last Seen",
    cell: ({ getValue }) => (
      <p>
        {parseInt(
          new Date(
            new Date().getTime() - new Date(getValue()).getTime(),
          ).getTime() /
            (1000 * 60),
        )}{" "}
        minutes ago
      </p>
    ),
  },
  {
    accessorKey: "outdoors",
    header: "Outdoors",
    cell: ({ getValue }) => <p>{getValue() ? "true" : "false"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
];

const Data = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    api("GET", "/api/locations").then(({ data }) => setData(data));
  }, []);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: {
      columnFilters: filters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="h-1/2 w-full bg-yellow-500 overflow-scroll p-2">
      <Search filters={filters} setFilters={setFilters} />
      <div className="bg-air-blue text-white">
        {getHeaderGroups().map(({ headers, id }) => (
          <div key={id} className="flex">
            {headers.map(({ id, column }) => (
              <div key={id} className="w-2/12 p-1 m-2">
                {column.columnDef.header}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {getRowModel().rows.map(({ id, getVisibleCells }) => (
          <div
            className="flex bg-white py-2 hover:bg-white/90 hover:cursor-pointer"
            key={id}
          >
            {getVisibleCells().map(({ id, column, getContext }) => (
              <div className="w-2/12 p-1 m-2" key={id}>
                {flexRender(column.columnDef.cell, getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
