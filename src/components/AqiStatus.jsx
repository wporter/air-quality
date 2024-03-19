import { statusOfAqi } from "@/data/StatusAqi";

const AqiStatus = ({ value, show }) => {
  const calcAqiColor = (value) => {
    const aqi = (value / 9) * 100;

    for (const range in statusOfAqi) {
      if (Object.prototype.hasOwnProperty.call(statusOfAqi, range)) {
        const [min, max] = range.split("-").map(Number);

        if (aqi >= min && aqi <= max) {
          return statusOfAqi[range];
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
        <circle
          cx="8"
          cy="8"
          r="6"
          fill="currentColor"
          stroke="grey"
          strokeWidth="0.5"
        />
        {show && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="5"
            className="fill-current text-aqi-black"
          >
            {Math.round((value / 9) * 100)}
          </text>
        )}
      </svg>
    </div>
  );
};

export default AqiStatus;
