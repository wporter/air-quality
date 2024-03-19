import { statusAqiColor } from "@/data/StatusAqiColor";

const AqiStatus = ({ value, show }) => {
  const calcAqiColor = (valOfAqi) => {
    for (const range in statusAqiColor) {
      if (Object.prototype.hasOwnProperty.call(statusAqiColor, range)) {
        const [min, max] = range.split("-").map(Number);

        if (valOfAqi >= min && valOfAqi <= max) {
          return statusAqiColor[range];
        }
      }
    }

    return "text-gray-500";
  };

  const aqiColor = calcAqiColor(value);

  return (
    <div className={`flex items-center`}>
      <svg
        className={`mr-2 ${aqiColor} ${show ? "h-11 w-11" : "h-6 w-6"}`}
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="6" fill="currentColor" />
        {show && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="5"
            className="fill-current text-aqi-black font-normal"
          >
            {value}
          </text>
        )}
      </svg>
    </div>
  );
};

export default AqiStatus;
