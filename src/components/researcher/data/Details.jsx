import { MdRefresh } from "react-icons/md";

const Details = ({ fields, refresh }) => {
  return (
    <div className="w-fit">
      <div className="flex justify-between items-center border-b-[1px] border-gray-300">
        <p className="text-xl">Device Details</p>
        <MdRefresh onClick={() => refresh()} />
      </div>

      {Object.entries(fields).map(([key, value], index) => (
        <div
          key={index}
          className="flex justify-between border-b-[1px] border-gray-200 p-2 gap-3"
        >
          <div>{key}</div>
          <div>{value ?? "Not Available"}</div>
        </div>
      ))}
      {Object.entries(fields).length === 0 && <p>Loading...</p>}
    </div>
  );
};

export default Details;
