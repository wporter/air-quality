import { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { statusAqiColor } from "@/data/StatusAqiColor";
import { aqiValue } from "@/data/Aqi";

const ArcGIS = ({ width, height, markers }) => {
  const mapDiv = useRef(null);

  // calculates aqi val
  const calcAqi = (value) => {
    let numerator = 0;
    let denominator = 0;
    let pmMin = 0;
    let pmMax = 0;

    let aqiLowerBound = 0;
    let aqiUpperBound = 0;

    for (const range in aqiValue) {
      if (Object.prototype.hasOwnProperty.call(aqiValue, range)) {
        const [min, max] = range.split("-").map(Number);

        if (value >= min && value <= max) {
          const [resultLower, resultUpper] = aqiValue[range]
            .split("-")
            .map(Number);
          aqiLowerBound = resultLower;
          aqiUpperBound = resultUpper;

          pmMin = min;
          pmMax = max;
          break;
        }
      }
    }

    numerator = aqiUpperBound - aqiLowerBound;
    denominator = pmMax - pmMin;

    const result = (numerator / denominator) * (value - pmMin) + aqiLowerBound;
    return Math.round(result);
  };

  // calculates the aqi color to display on markers
  const calcAqiColor = (valOfAqi) => {
    for (const range in statusAqiColor) {
      if (Object.prototype.hasOwnProperty.call(statusAqiColor, range)) {
        const [min, max] = range.split("-").map(Number);

        if (valOfAqi >= min && valOfAqi <= max) {
          return statusAqiColor[range];
        }
      }
    }

    return "text-gray-500";
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

      markers.forEach((marker) => {
        const {
          geo,
          sn,
          measurements: { pm10 },
        } = marker;

        if (geo.lat == null || geo.lon === null) {
          return;
        }

        const pm10AqiVal = calcAqi(Math.round(pm10));
        const color = calcAqiColor(pm10AqiVal);

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
            AQI: pm10AqiVal,
          },
          popupTemplate: new PopupTemplate({
            title: "{SN}",
            content: [
              {
                type: "text",
                text: "PM10: {PM10} μg/m³<br>AQI: {AQI}",
              },
            ],
          }),
        });

        view.graphics.add(pointGraphic);
      });

      return () => view && view.destroy();
    }
  }, [mapDiv, markers]);

  return <div className={`m-0 p-0 ${width} ${height}`} ref={mapDiv}></div>;
};

export default ArcGIS;
