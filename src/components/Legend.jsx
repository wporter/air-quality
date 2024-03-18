import React from "react";

const Legend = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
      <div className="text-sm font-normal mb-2">Air Quality Index</div>

      <div className="flex">
        <div className="w-14 h-6 bg-aqi-green flex justify-center items-center text-xs">
          0-50
        </div>
        <div className="w-14 h-6 bg-aqi-yellow flex justify-center items-center text-xs">
          51-100
        </div>
        <div className="w-14 h-6 bg-aqi-orange flex justify-center items-center text-xs">
          101-150
        </div>
        <div className="w-14 h-6 bg-aqi-red flex justify-center items-center text-xs">
          151-200
        </div>
        <div className="w-14 h-6 bg-aqi-purple flex justify-center items-center text-xs">
          201-300
        </div>
        <div className="w-14 h-6 bg-aqi-maroon flex justify-center items-center text-xs">
          300+
        </div>
      </div>
    </div>
  );
};

export default Legend;
