"use client";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { ParentSize } from "@visx/responsive";

// Accessors
const accessors = {
  xAccessor: (d) => d && new Date(d.x),
  yAccessor: (d) => d && (d.y !== null ? d.y : undefined),
};

const Line = ({ data, title, units }) => {
  if (!data || data.length === 0) {
    return <div className="pl-4 py-4 w-1/3">No data available for {title}</div>;
  }

  // Filter out points that have null/undefined y values
  const cleanedData = data.filter(
    (point) => point.y !== null && point.y !== undefined,
  );

  if (cleanedData.length === 0) {
    return <div className="pl-4 py-4 w-1/3">No valid {title} data</div>;
  }

  return (
    <div className="pl-4 py-4 w-1/3">
      {title}
      <ParentSize className="-my-8">
        {({ width }) => (
          <XYChart
            height={250}
            width={Math.max(Math.min(width, 415), 300)}
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
            />
            <AnimatedAxis
              hideAxisLine
              hideTicks
              orientation="bottom"
              numTicks={4}
              tickFormat={(date) =>
                new Date(date).toLocaleTimeString(navigator.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <AnimatedAxis
              hideAxisLine
              hideTicks
              orientation="left"
              numTicks={6}
              label={units}
            />
            <AnimatedLineSeries
              stroke="#FF0000"
              dataKey={title}
              data={cleanedData}
              {...accessors}
            />
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
                      ({ datum }, index) => (
                        <div key={index}>
                          {datum.y} {units}
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
