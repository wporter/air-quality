import Details from "./Details";
import Line from "./Line";

const Data = ({ data, fields, meta }) => {
  return (
    <div className="flex">
      <Details fields={fields} meta={meta} />
      <div className="h-full w-full flex flex-wrap">
        {data.map(({ data, units, title }, index) => (
          <Line key={index} data={data} title={title} units={units} />
        ))}
      </div>
    </div>
  );
};

export default Data;
