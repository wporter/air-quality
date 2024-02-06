import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";

const Dropdown = ({ options, option, setOption }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative w-2/12 p-1 bg-white rounded-lg border-gray-400 border-2 my-2">
      <div
        onClick={() => setToggle(!toggle)}
        className="flex items-center justify-between px-2 hover:cursor-pointer text-gray-400"
      >
        {option.text}{" "}
        <GoTriangleDown className={`${toggle && "rotate-180"} text-2xl`} />
      </div>

      <div
        className={`absolute bg-white w-full ${
          toggle ? "border-gray-400 border-2" : ""
        } my-2 text-nav-black rounded-lg`}
      >
        {toggle &&
          options.map(({ accessor, text }, index) => (
            <div
              className={`hover:cursor-pointer px-4 py-1 hover:bg-nav-hover transition-colors duration-300 ${
                index < 2 && "border-b-2 border-dropdown-grey"
              } ${
                index === 0
                  ? "hover:rounded-t-lg"
                  : index === options.length - 1
                    ? "hover:rounded-b-lg"
                    : ""
              }`}
              key={index}
              onClick={() => {
                setOption({ accessor, text });
                setToggle(!toggle);
              }}
            >
              {text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
