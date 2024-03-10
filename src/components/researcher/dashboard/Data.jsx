"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import Tag from "../Tag";
import { GoArrowRight } from "react-icons/go";

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
    accessorKey: "outdoors",
    header: "Outdoors",
    cell: ({ getValue }) => (
      <Tag
        color={getValue() ? "1" : "0"}
        text={getValue() ? "True" : "False"}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Tag
        color={getValue() === "ACTIVE" ? "1" : "0"}
        text={
          getValue().charAt(0).toUpperCase() + getValue().slice(1).toLowerCase()
        }
      />
    ),
  },
  {
    accessorKey: "sn",
    header: "Link",
    cell: ({ getValue }) => (
      <Link href={`/researcher/data/${getValue()}`}>
        <div className="bg-table-grey w-fit px-4 py-1 rounded-xl flex justify-center items-center">
          More Data
          <GoArrowRight className="text-xl ml-1" />
        </div>
      </Link>
    ),
  },
];

const Data = ({ data }) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-2 px-8 w-full h-1/2 overflow-y-scroll">
      <div className="bg-air-blue-200 text-white rounded-t-lg">
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
      <div className="overflow-y-scroll h-[85%]">
        {getRowModel().rows.map(({ id, getVisibleCells }) => (
          <div
            className="flex bg-white p-1 hover:bg-nav-hover hover:cursor-pointer transition-colors duration-300 mt-2 mb-2"
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
