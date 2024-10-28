import { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { statusAqiColor } from "@/data/StatusAqiColor";
import { aqiValue } from "@/data/Aqi";
import Legend from "@arcgis/core/widgets/Legend";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

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

    // returns a default grey color if aqi color can't be found
    return "#999999";
  };

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      const layer = new FeatureLayer({
        title: "Air Quality Index",
        source: [], // Will be populated with graphics
        fields: [
          {
            name: "SN",
            alias: "Sensor Number",
            type: "string",
          },
          {
            name: "PM10",
            alias: "PM10 Concentration (μg/m³)",
            type: "double",
          },
          {
            name: "AQI",
            alias: "Air Quality Index",
            type: "integer",
          },
          {
            name: "LastSeen",
            alias: "Last Seen (minutes ago)",
            type: "integer",
          },
        ],
        objectIdField: "ObjectID",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            size: 8,
          },
          visualVariables: [
            {
              type: "color",
              field: "AQI",
              stops: [
                { value: 0, color: "#00E400", label: "Good (0-50)" },
                { value: 51, color: "#FFFF00", label: "Moderate (51-100)" },
                {
                  value: 101,
                  color: "#FF7E00",
                  label: "Unhealthy for Sensitive Groups (101-150)",
                },
                { value: 151, color: "#FF0000", label: "Unhealthy (151-200)" },
                {
                  value: 201,
                  color: "#8F3F97",
                  label: "Very Unhealthy (201-300)",
                },
                { value: 301, color: "#7E0023", label: "Hazardous (301+)" },
              ],
            },
          ],
        },
      });

      map.add(layer);

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-117.5981, 34.056],
        zoom: 11,
      });

      const customLegend = document.createElement("div");
      customLegend.innerHTML = `
        <div style="padding: 10px; background: white; border: 1px solid #ccc; border-radius: 5px;">
          <h3 style="font-size: 14px; margin: 0 0 5px 0;">Legend</h3>
          <p style="margin: 2px 0;"><span style="color: #00E400; font-weight: bold;">Green</span>: Safe</p>
          <p style="margin: 2px 0;"><span style="color: #FFFF00; font-weight: bold;">Yellow</span>: Moderate</p>
          <p style="margin: 2px 0;"><span style="color: #FF0000; font-weight: bold;">Red</span>: Dangerous</p>
          <p style="margin: 5px 0; font-style: italic;">Marker Value: AQI</p>
        </div>
      `;

      // Position the custom legend in the bottom-right corner
      view.ui.add(customLegend, "bottom-right");

      markers.forEach((marker) => {
        const {
          geo,
          sn,
          // eslint-disable-next-line camelcase
          timestamp_local,
          measurements: { pm10 },
        } = marker;

        if (geo.lat == null || geo.lon === null) {
          return;
        }

        // calc when sensor was last seen --> converts time into mins
        const lastSeen = new Date(
          new Date().getTime() - new Date(timestamp_local).getTime(),
        ).getMinutes();

        // calcs aqi val using pm10
        const pm10AqiVal = calcAqi(Math.round(pm10));

        // calcs color of aqi
        const color = calcAqiColor(pm10AqiVal);

        // info for marker itself
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
            LastSeen: lastSeen,
          },
          popupTemplate: new PopupTemplate({
            title: `{SN}<br></br><p style="font-style: italic; font-weight: 100; font-size: 0.75rem;">
            Last Seen: {LastSeen} minutes ago
          </p>`,
            content: `
            <div style="padding-left: 10px; padding-top: 10px; padding-bottom: 15px;">
                <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 80%;">
                  <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Pollutant</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">AQI</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Concentration</th>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">PM10</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: ${color};">{AQI}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">{PM10} μg/m³</td>
                  </tr>
                </table>
              </div>
            `,
          }),
        });

        layer.source.add(pointGraphic);
      });

      return () => view && view.destroy();
    }
  }, [mapDiv, markers]);

  return <div className={`m-0 p-0 ${width} ${height}`} ref={mapDiv}></div>;
};

export default ArcGIS;
