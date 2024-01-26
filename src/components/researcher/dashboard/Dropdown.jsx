import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ options, option, setOption }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative w-2/12 bg-purple-500">
      <div
        onClick={() => setToggle(!toggle)}
        className="flex items-center justify-between px-2 hover:cursor-pointer"
      >
        {option.text} <FaChevronDown className={`${toggle && "rotate-180"}`} />
      </div>

      <div className="absolute bg-white w-full">
        {toggle &&
          options.map(({ accessor, text }, index) => (
            <div
              className="hover:cursor-pointer px-2"
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
