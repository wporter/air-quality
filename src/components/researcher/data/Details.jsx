import { MdRefresh } from "react-icons/md";

const Details = ({ fields, refresh }) => {
  return (
    <div className="w-fit border border-gray-300 font-neue rounded-lg pl-9 pr-9">
      <div className="flex justify-between items-center border-b-[2px]  border-gray-300 mx-[-1.5rem] px-6 py-2">
        <p className="text-lg font-bold px-2 ">DEVICE DETAILS</p>
        <MdRefresh onClick={() => refresh()} />
      </div>

      {Object.entries(fields).map(([key, value], index) => (
        <div
          key={index}
          className="flex justify-between border-b-[1px] border-gray-200 p-4 gap-40 "
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
