import { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { statusAqiColor } from "@/data/StatusAqiColor";

const ArcGIS = ({ width, height, markers }) => {
  const mapDiv = useRef(null);

  const calcAqiColor = (valOfAqi) => {
    for (const range in statusAqiColor) {
      if (Object.prototype.hasOwnProperty.call(statusAqiColor, range)) {
        const [min, max] = range.split("-").map(Number);

        if (valOfAqi >= min && valOfAqi <= max) {
          return statusAqiColor[range];
        }
      }
    }
  };

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-117.5981, 34.056],
        zoom: 11,
      });

      const popupTemplate = new PopupTemplate({
        title: "{SN}",
        content: "PM10: {PM10}",
      });

      markers.forEach((marker) => {
        const {
          geo,
          sn,
          measurements: { pm10 },
        } = marker;

        const color = calcAqiColor(pm10);

        if (geo.lat == null || geo.lon === null) {
          return;
        }

        const pointGraphic = new Graphic({
          geometry: {
            type: "point",
            longitude: geo.lon,
            latitude: geo.lat,
          },
          symbol: {
            type: "simple-marker",
            color: color,
          },
          attributes: {
            SN: sn,
            PM10: pm10,
          },
          popupTemplate: popupTemplate,
        });

        view.graphics.add(pointGraphic);
      });

      return () => view && view.destroy();
    }
  }, [mapDiv, markers]);

  return <div className={`m-0 p-0 ${width} ${height}`} ref={mapDiv}></div>;
};

export default ArcGIS;
