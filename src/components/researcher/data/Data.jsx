import Details from "./Details";
import Line from "./Line";

const Data = ({ data, fields, meta }) => {
  return (
    <div className="flex items-start justify-start mr-8 pl-8 ml-8 mt-4  p-4 ">
      <Details fields={fields} meta={meta} />
      <div className="ml-8 mt-4   flex flex-wrap border border-gray-300 rounded-md">
        {data.map(({ data, units, title }, index) => (
          <Line key={index} data={data} title={title} units={units} />
        ))}
      </div>
    </div>
  );
};

export default Data;
