import React from "react";

const Legend = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
      <div className="text-sm font-normal mb-2">Air Quality Index</div>

      <div className="flex">
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-green flex justify-center items-center text-xs"></div>
          <p className="text-xs">0-50</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-yellow flex justify-center items-center text-xs"></div>
          <p className="text-xs">51-100</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-orange flex justify-center items-center text-xs"></div>
          <p className="text-xs">101-150</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-red flex justify-center items-center text-xs"></div>
          <p className="text-xs">151-200</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-purple flex justify-center items-center text-xs"></div>
          <p className="text-xs">201-300</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-4 bg-aqi-maroon flex justify-center items-center text-xs"></div>
          <p className="text-xs">300+</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;
