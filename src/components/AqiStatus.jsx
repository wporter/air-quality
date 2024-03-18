import { FaCircle } from "react-icons/fa";
import { statusOfAqi } from "@/data/StatusAqi";

const AqiStatus = ({ className, value }) => {
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
    <div className={`flex items-center ${className}`}>
      <FaCircle className={`${aqiColor} mr-2`} />
    </div>
  );
};

export default AqiStatus;
