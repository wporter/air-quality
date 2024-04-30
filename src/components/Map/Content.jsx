/* eslint-disable camelcase */
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Marker from "@/components/Marker";
import Legend from "@/components/Legend";

const Map = ({ height, width, markers }) => {
  const position = [34.056, -117.5981];

  return (
    <div className={`relative ${height} ${width}`}>
      <MapContainer
        className="rounded-lg z-0 h-full w-full"
        center={position}
        zoom={11}
        minZoom={8}
        maxZoom={18}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map(({ geo, sn, timestamp_local, measurements }, index) => (
          <Marker
            key={index}
            lat={geo.lat}
            lon={geo.lon}
            sn={sn}
            timestamp_local={timestamp_local}
            measurements={measurements}
          />
        ))}
      </MapContainer>

      <Legend />
    </div>
  );
};

export default Map;
