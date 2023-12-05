import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
  const position = [34.056, -117.5981];

  const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="31.1306" cy="31.5943" r="30.6838" transform="rotate(0.170285 31.1306 31.5943)" fill="#506D98" fill-opacity="0.75"/>
</svg>
    `)}`;

  const ICON = L.icon({
    iconUrl: MARKER,
    iconSize: [64, 64],
    iconAnchor: new L.Point(32, 32),
    popupAnchor: new L.Point(0, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  return (
    <MapContainer
      className="h-[40vh] w-11/12"
      center={position}
      zoom={11}
      minZoom={8}
      maxZoom={20}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker icon={ICON} position={[33.98, -117.587]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
