/* eslint-disable camelcase */
import { Marker as LeafletMarker, Tooltip } from "react-leaflet";
import AqiStatus from "@/components/AqiStatus";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

const Marker = ({ sn, lat, lon, timestamp_local, measurements }) => {
  const iconHtml = ReactDOMServer.renderToString(
    <AqiStatus value={measurements.pm25} show="true" />,
  );

  const ICON = L.divIcon({
    html: iconHtml,
    iconSize: [95, 100],
    iconAnchor: new L.Point(8, 8),
    popupAnchor: new L.Point(0, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: "border-none",
  });

  const handleClick = async () => {};

  return (
    lat &&
    lon && (
      <LeafletMarker
        position={[lat, lon]}
        icon={ICON}
        eventHandlers={{
          click: handleClick,
        }}
      >
        <Tooltip offset={[14, 0]} direction="top">
          <div className="flex flex-col px-2 space-y-3">
            <div className="flex flex-row items-center space-x-5 border-b border-tooltip-grey p-1">
              <AqiStatus value={measurements.pm25} />
              <p className="font-normal text-base text-tooltip-black-100">
                {sn}
              </p>
              <p className="italic font-thin text-xs">
                Last Seen:{" "}
                {new Date(
                  new Date().getTime() - new Date(timestamp_local).getTime(),
                ).getMinutes()}{" "}
                minutes ago
              </p>
            </div>

            <div className="flex justify-between pl-2 pr-2 pb-2">
              <div>
                {Object.entries(measurements).map(
                  ([measurement, value], index) => (
                    <div className="flex gap-2" key={index}>
                      <p className="font-light text-base text-tooltip-black-200">
                        {measurement}:
                      </p>
                      <p className="font-light text-base text-tooltip-black-200">
                        {value}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div className="font-light text-base">
                AQI: {Math.round((measurements.pm25 / 9) * 100)}
              </div>
            </div>
          </div>
        </Tooltip>
      </LeafletMarker>
    )
  );
};

export default Marker;
