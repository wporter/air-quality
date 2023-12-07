import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";

const accessors = {
  xAccessor: (d) => d && new Date(d.x),
  yAccessor: (d) => d.y,
};

const Line = ({ data }) => {
  return (
    <XYChart
      height={1000}
      width={1000}
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
      <AnimatedAxis hideAxisLine hideTicks orientation="bottom" numTicks={4} />
      <AnimatedAxis hideAxisLine hideTicks orientation="left" numTicks={10} />

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
  );
};

export default Line;
