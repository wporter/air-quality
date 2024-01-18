import React from "react";

export const Tag = ({ text, backgroundColor }) => {
  return (
    <div
      className={`${backgroundColor} min-w-fit px-10 py-4 my-4 rounded-3xl text-3xl flex justify-center items-center`}
    >
      {text}
    </div>
  );
};

export default Tag;
