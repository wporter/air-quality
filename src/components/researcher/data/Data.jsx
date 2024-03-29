import Details from "./Details";
import Line from "./Line";

const Data = ({ data, fields, meta }) => {
  return (
    <div className="flex items-start justify-start mx-4 ">
      <Details fields={fields} meta={meta} />
      <div className="flex flex-wrap border border-gray-300 rounded-md m-4">
        {data.map(({ data, units, title }, index) => (
          <Line key={index} data={data} title={title} units={units} />
        ))}
      </div>
    </div>
  );
};

export default Data;
