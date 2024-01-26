import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ option, filters, setFilters }) => {
  const value = filters.find(({ id }) => id === option)?.value || "";

  const onChange = (id, value) =>
    setFilters((prev) =>
      prev.filter(({ id }) => id !== option).concat({ id, value }),
    );

  return (
    <div className="flex items-center p-1 bg-white rounded-lg w-fit border-gray-400 border-2 my-2">
      <FaSearch className="mx-2 text-gray-400" />
      <input
        type="text"
        value={value}
        placeholder="Search"
        onChange={(e) => onChange(option, e.target.value)}
        className="focus:outline-none"
      />
    </div>
  );
};

export default Search;
