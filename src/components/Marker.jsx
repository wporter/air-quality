import { Marker as LeafletMarker, Tooltip } from "react-leaflet";
import { FaCircle } from "react-icons/fa";
import L from "leaflet";

const Marker = ({ sn, lat, lon, lastSeen }) => {
  const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
  <svg width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.0254 27.3125C27.4507 27.3125 25.9404 26.6869 24.8269 25.5734C23.7134 24.4599 23.0879 22.9497 23.0879 21.375C23.0879 19.8003 23.7134 18.2901 24.8269 17.1766C25.9404 16.0631 27.4507 15.4375 29.0254 15.4375C30.6001 15.4375 32.1103 16.0631 33.2238 17.1766C34.3373 18.2901 34.9629 19.8003 34.9629 21.375C34.9629 22.1547 34.8093 22.9268 34.5109 23.6472C34.2125 24.3676 33.7752 25.0221 33.2238 25.5734C32.6725 26.1248 32.0179 26.5621 31.2976 26.8605C30.5772 27.1589 29.8051 27.3125 29.0254 27.3125ZM29.0254 4.75C24.6162 4.75 20.3875 6.50156 17.2697 9.61935C14.1519 12.7371 12.4004 16.9658 12.4004 21.375C12.4004 33.8438 29.0254 52.25 29.0254 52.25C29.0254 52.25 45.6504 33.8438 45.6504 21.375C45.6504 16.9658 43.8988 12.7371 40.781 9.61935C37.6632 6.50156 33.4346 4.75 29.0254 4.75Z" fill="#006DD1"/>
  </svg>
    `)}`;

  const ICON = L.icon({
    iconUrl: MARKER,
    iconSize: [45, 45],
    iconAnchor: new L.Point(8, 8),
    popupAnchor: new L.Point(0, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  // const calcTime = () => {
  //   const computed = parseInt(
  //     new Date(
  //       new Date().getTime() -
  //         new Date(
  //           new Date(lastSeen).getTime() -
  //             new Date().getTimezoneOffset() * 60000,
  //         ),
  //     ).getTime() /
  //       (1000 * 60),
  //   );

  //   if (computed < 60) {
  //     return `${computed} minutes ago`;
  //   } else {
  //     return `${(computed / 60).toFixed(2)} hours ago`;
  //   }
  // };

  const handleClick = async () => {};

  return (
    lat &&
    lon && (
      <LeafletMarker
        icon={ICON}
        position={[lat, lon]}
        eventHandlers={{
          click: handleClick,
        }}
      >
        <Tooltip offset={[15, 0]} direction="top">
          <div className="flex flex-col px-2 space-y-3">
            <div className="flex flex-row items-center space-x-5 border-b border-tooltip-grey p-1">
              <FaCircle className="text-tooltip-green text-base" />
              <p className="font-normal text-base text-tooltip-black-100">
                MOD-145273
              </p>
              <p className="italic font-thin text-xs">Last Seen 14s ago</p>
            </div>

            <div className="flex flex-row items-center space-x-40 px-2">
              <p className="font-light text-base text-tooltip-black-200">
                PM: 2.5
              </p>
              <p className="font-light text-base text-tooltip-black-200">
                AQI: 45
              </p>
            </div>
          </div>
        </Tooltip>
      </LeafletMarker>
    )
  );
};

export default Marker;
