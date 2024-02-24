"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { useState } from "react";
// import Search from "../Search";
// import Dropdown from "./Dropdown";
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
    accessorKey: "last_seen",
    header: "Last Seen",
    cell: ({ getValue }) => {
      const computed = parseInt(
        new Date(
          new Date().getTime() -
            new Date(
              new Date(getValue()).getTime() -
                new Date().getTimezoneOffset() * 60000,
            ),
        ).getTime() /
          (1000 * 60),
      );

      return (
        <>
          {computed < 60 && <p>{computed} minutes ago</p>}
          {computed > 60 && <p>{(computed / 60).toFixed(2)} hours ago</p>}
        </>
      );
    },
  },
  {
    accessorKey: "outdoors",
    header: "Outdoors",
    cell: ({ getValue }) => (
      <Tag bg={getValue() ? "1" : "0"} text={getValue() ? "True" : "False"} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Tag
        bg={getValue() === "ACTIVE" ? "1" : "0"}
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
        <Tag bg={"grey"} text={"More Data"} Icon={GoArrowRight} color="black" />
      </Link>
    ),
  },
];

const Data = ({ data }) => {
  // const [filters, setFilters] = useState([]);
  // const [option, setOption] = useState({
  //   text: "Serial Number",
  //   accessor: "sn",
  // });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    // state: {
    //   columnFilters: filters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // const options = [
  //   {
  //     accessor: "description",
  //     text: "Description",
  //   },
  //   {
  //     accessor: "sn",
  //     text: "Serial Number",
  //   },
  //   {
  //     accessor: "model",
  //     text: "Model",
  //   },
  // ];

  return (
    <div className="mt-2 px-8 w-full h-1/2 overflow-y-scroll">
      {/* <div className="flex items-center gap-2">
        <Dropdown options={options} option={option} setOption={setOption} />
        <Search
          option={option.accessor}
          filters={filters}
          setFilters={setFilters}
        />
      </div> */}

      <div className="bg-air-blue-200 text-white">
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
            className="flex bg-white p-1 hover:bg-white/90 hover:cursor-pointer"
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
