const Details = ({ fields }) => {
  return (
    <div className="w-1/3 border border-gray-300 rounded-lg px-9 py-4 my-4">
      <div className="flex justify-between items-center border-b-2 border-gray-300 py-2">
        <p className="text-lg font-bold px-2">DEVICE DETAILS</p>
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
