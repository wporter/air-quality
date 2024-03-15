import Details from "./Details";
import Line from "./Line";

const Data = ({ data, fields, meta }) => {
  return (
    <div className="flex mr-8 min-h-screen bg-gray-100 ">
      <Details fields={fields} meta={meta} />
      <div className="ml-8 mt-4 h-full w-full flex flex-wrap border border-gray-300 rounded-md p-4">
        {data.map(({ data, units, title }, index) => (
          <Line key={index} data={data} title={title} units={units} />
        ))}
      </div>
    </div>
  );
};

export default Data;
