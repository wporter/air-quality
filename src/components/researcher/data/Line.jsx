import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { ParentSize } from "@visx/responsive";

const accessors = {
  xAccessor: (d) => d && new Date(d.x),
  yAccessor: (d) => d.y,
};

const Line = ({ data, title, units }) => {
  console.log(data);

  if (data.PM1.points.length === 0) {
    return <>loading</>;
  }

  return (
    <div className="w-1/3">
      {title}
      <ParentSize className="-my-8">
        {({ width }) => (
          <XYChart
            // height={1000}
            height="300"
            width={width}
            xScale={{ type: "time" }}
            yScale={{ type: "linear" }}
          >
            <AnimatedGrid
              numTicks={10}
              lineStyle={{
                stroke: "#f1f1f1",
                strokeLinecap: "round",
                strokeWidth: 1,
              }}
              label="poggers"
            />
            <AnimatedAxis
              hideAxisLine
              hideTicks
              orientation="bottom"
              numTicks={4}
              // label="Timestamp (PST) UTC-08:00"
            />
            <AnimatedAxis
              hideAxisLine
              hideTicks
              orientation="left"
              numTicks={10}
              label={units}
            />
            {Object.values(data).map(({ stroke, key, points }, index) => (
              <AnimatedLineSeries
                key={index}
                stroke={stroke}
                dataKey={key}
                data={points}
                {...accessors}
              />
            ))}
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showSeriesGlyphs
              glyphStyle={{
                fill: "#008561",
                strokeWidth: 0,
              }}
              renderTooltip={({ tooltipData }) => {
                return (
                  <>
                    {Object.values(tooltipData.datumByKey).map(
                      ({ datum, key }, index) => (
                        <div key={index}>
                          {key}: {datum.y}
                        </div>
                      ),
                    )}
                  </>
                );
              }}
            />
          </XYChart>
        )}
      </ParentSize>
    </div>
  );
};

export default Line;
