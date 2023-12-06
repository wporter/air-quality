import { Marker as LeafletMarker, Popup } from "react-leaflet";
import L from "leaflet";

const Marker = ({ lat, lon }) => {
  const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="31.1306" cy="31.5943" r="30.6838" transform="rotate(0.170285 31.1306 31.5943)" fill="#506D98" fill-opacity="0.75"/>
</svg>
    `)}`;

  const ICON = L.icon({
    iconUrl: MARKER,
    iconSize: [12, 12],
    iconAnchor: new L.Point(6, 6),
    popupAnchor: new L.Point(0, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  return (
    lat &&
    lon && (
      <LeafletMarker icon={ICON} position={[lat, lon]}>
        <Popup>
          {lat}
          {lon}
        </Popup>
      </LeafletMarker>
    )
  );
};

export default Marker;
