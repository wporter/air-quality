import { FaCircle } from "react-icons/fa";
import { statusOfAqi } from "@/data/StatusAqi";

const AqiStatus = ({ value }) => {
  // aqi calc for PM2.5 and PM10: concentration / standard x 100
  // standard: 9 µg/m3 for PM2.5, and 150 µg/m3 for PM10

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
    <div className="flex items-center">
      <FaCircle className={`text-base ${aqiColor} mr-2`} />
    </div>
  );
};

export default AqiStatus;
