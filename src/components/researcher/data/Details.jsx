import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const Details = ({ fields, meta }) => {
  const { sn } = meta;

  const url = `https://app.quant-aq.com/device/${sn}`;

  return (
    <div className="w-5/12 border border-gray-300 rounded-lg px-9 py-4 m-4">
      <div className="flex justify-between items-center border-b-2 border-gray-300 py-2">
        <p className="text-lg font-bold px-2">{sn}</p>
        <Link href={url} target="_blank">
          <FaExternalLinkAlt />
        </Link>
      </div>

      {Object.entries(fields).map(([key, value], index) => (
        <div
          key={index}
          className="flex justify-between border-b-[1px] border-gray-200 p-4"
        >
          <div>{key}</div>
          {value === "Not Available" ? (
            <p className="text-gray-300">Unavailable</p>
          ) : (
            <p>{value}</p>
          )}
        </div>
      ))}
      {Object.entries(fields).length === 0 && (
        <div className="flex justify-center border-b-[1px] border-gray-200 p-4">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Details;
