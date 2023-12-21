import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Marker from "@/components/Marker";

const Map = ({ markers, setData }) => {
  const position = [34.056, -117.5981];

  return (
    <MapContainer
      className="h-[60vh] w-full !z-0"
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
      {markers.map(({ geo, sn }, index) => (
        <Marker
          key={index}
          lat={geo.lat}
          lon={geo.lon}
          sn={sn}
          setData={setData}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
