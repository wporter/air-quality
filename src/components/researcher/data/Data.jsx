import { getDataDetails, getLine } from "@/utils/api";
import Details from "./Details";
import Line from "./Line";

const Data = async ({ sn }) => {
  const data = await getLine(sn);
  const fields = await getDataDetails(sn);

  return (
    <div className="flex">
      <Details fields={fields} refresh={() => {}} />
      <div className="h-full w-full flex flex-wrap">
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
        <Line
          data={data}
          title="Particulate Matter"
          units="particles per something something"
        />
        <Line data={data} title="Gases" units="particles per billion" />
        <Line
          data={data}
          title="Other Information"
          units="particles per something something"
        />
      </div>
    </div>
  );
};

export default Data;
