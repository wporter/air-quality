import { FaExternalLinkAlt } from "react-icons/fa";
const Details = ({ fields }) => {
  const serial = fields["Serial Number"] || "DEVICE DETAILS";
  const deviceLink = `https://app.quant-aq.com/device/${serial}`;

  return (
    <div className="w-1/3 border border-gray-300 rounded-lg px-9 py-4 my-4">
      <div className="flex justify-between items-center border-b-2 border-gray-300 py-2">
        <p className="text-lg font-bold px-2">{serial} </p>
        <a
          href={deviceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center" // Add any additional styling as needed
        >
          <FaExternalLinkAlt />
        </a>
      </div>
      {Object.entries(fields).map(([key, value], index) => (
        <div
          key={index}
          className="flex justify-between border-b-[1px] border-gray-200 p-4"
        >
          <div>{key}</div>
          {value === "Not Available" ? (
            <p className="text-gray-300">Not Available</p>
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
