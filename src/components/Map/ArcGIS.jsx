import { useRef, useEffect } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { statusAqiColor } from "@/data/StatusAqiColor";
import { aqiValue } from "@/data/Aqi";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { useState } from "react";

const ArcGIS = ({ width, height, markers }) => {
  const mapDiv = useRef(null);
  const [selectedPollutant, setSelectedPollutant] = useState("AQI");
  // calculates AQI value
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

  // calculates AQI color for markers
  const calcAqiColor = (valOfAqi) => {
    for (const range in statusAqiColor) {
      if (Object.prototype.hasOwnProperty.call(statusAqiColor, range)) {
        const [min, max] = range.split("-").map(Number);
        if (valOfAqi >= min && valOfAqi <= max) {
          return statusAqiColor[range];
        }
      }
    }
    return "#999999";
  };

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY;

      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      // Traffic Layer
      const trafficLayer = new MapImageLayer({
        url: "https://traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",
        sublayers: [
          { id: 5, visible: true }, // North america traffic
          { id: 7, visible: true }, // General traffic
          { id: 6, visible: true }, // Live traffic

          // Hide the incididents
          { id: 1, visible: false }, // North america traffic incidents
          { id: 4, visible: false }, // Detailed incidents
          { id: 3, visible: false }, // Intermediete incident
          { id: 2, visible: false }, // Incidents overview
        ],
      });

      trafficLayer.when(() => {
        console.log("Traffic Layer Sublayers:");
        trafficLayer.allSublayers.items.forEach((layer, index) => {
          console.log(
            `Index: ${index}, ID: ${layer.id}, Title: ${layer.title}`,
          );
        });
      });

      map.add(trafficLayer);

      // Feature Layer for AQI markers
      const layer = new FeatureLayer({
        title: "Air Quality Index",
        source: [], // Populated with graphics
        fields: [
          { name: "SN", alias: "Sensor Number", type: "string" },
          { name: "PM10", alias: "PM10 Concentration (μg/m³)", type: "double" },
          { name: "AQI", alias: "Air Quality Index", type: "integer" },
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
                { value: 101, color: "#FF7E00", label: "Unhealthy (101-150)" },
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

      // Custom legend
      const customLegend = document.createElement("div");
      customLegend.innerHTML = `
        <div style="padding: 8px; background: white; border: 1px solid #ccc; border-radius: 5px; font-size: 12px;">
          <h3 style="font-size: 14px; margin: 0 0 5px 0;">Legend</h3>
          <p style="margin: 2px 0;"><strong>Markers:</strong> AQI sensors</p>
          <p style="margin: 2px 0;"><span style="color: #00E400; font-weight: bold;">Green</span>: Safe</p>
          <p style="margin: 2px 0;"><span style="color: #FFFF00; font-weight: bold;">Yellow</span>: Moderate</p>
          <p style="margin: 2px 0;"><span style="color: #FF0000; font-weight: bold;">Red</span>: Dangerous</p>
          <p style="margin: 2px 0;">Marker Value: AQI</p>
        </div>
      `;
      view.ui.add(customLegend, "bottom-right");

      view.graphics.removeAll();
      markers.forEach((marker) => {
        const {
          geo,
          description,
          timestamp_local: timestampLocal,
          measurements: { pm10 },
        } = marker;

        if (geo.lat == null || geo.lon === null) {
          return;
        }

        const lastSeen = new Date(
          new Date().getTime() - new Date(timestampLocal).getTime(),
        ).getMinutes();
        let displayedValue;
        console.log(
          `Marker ${marker.sn} pm2.5 Value:`,
          marker.measurements.pm25,
        );

        switch (selectedPollutant) {
          case "PM2.5":
            displayedValue = Math.round(marker.measurements.pm25) || "N/A";
            break;
          case "PM10":
            displayedValue = Math.round(marker.measurements.pm10) || "N/A";
            break;
          case "O3":
            displayedValue =
              marker.measurements.o3 !== undefined
                ? Math.round(marker.measurements.o3)
                : "N/A";
            break;
          default:
            displayedValue = calcAqi(Math.round(marker.measurements.pm10));
        }
        const pm10AqiVal = calcAqi(Math.round(marker.measurements.pm10)); // Ensure pm10AqiVal is defined

        const color = (() => {
          if (selectedPollutant === "AQI") {
            return calcAqiColor(pm10AqiVal); // AQI uses the predefined color function
          } else {
            const value =
              selectedPollutant === "PM2.5"
                ? marker.measurements.pm25
                : selectedPollutant === "PM10"
                  ? marker.measurements.pm10
                  : selectedPollutant === "O3"
                    ? marker.measurements.o3
                    : null; // Default to null if no valid pollutant is selected

            if (value === null || value === undefined) return "#999999"; // Gray if no data

            if (value <= 50) return "#00E400";
            if (value <= 100) return "#FFFF00";
            if (value <= 150) return "#FF7E00";
            if (value <= 200) return "#FF0000";
            if (value <= 300) return "#8F3F97";
            return "#7E0023";
          }
        })();

        const concentrationValue =
          selectedPollutant === "PM2.5"
            ? marker.measurements.pm25?.toFixed(2)
            : selectedPollutant === "PM10"
              ? marker.measurements.pm10?.toFixed(2)
              : selectedPollutant === "O3"
                ? marker.measurements.o3?.toFixed(2)
                : marker.measurements.pm10?.toFixed(2);

        const pointGraphic = new Graphic({
          geometry: {
            type: "point",
            longitude: geo.lon,
            latitude: geo.lat,
          },
          symbol: {
            type: "text",
            color: "#FFFFFF",
            text: displayedValue.toString(),
            font: {
              size: 12,
              weight: "bold",
            },
            backgroundColor: color,
            borderLineSize: 1,
            borderLineColor: "#FFFFFF",
            yoffset: -15,
            xoffset: 0,
            horizontalAlignment: "center",
          },
          attributes: {
            Description: description,
            PM10: pm10,
            AQI: pm10AqiVal,
            LastSeen: lastSeen,
          },
          popupTemplate: new PopupTemplate({
            title: `<div style="word-wrap: break-word; max-width: 200px;">{Description}</div><br ></br><p style="font-style: italic; font-weight: 100; font-size: 0.75rem;">
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
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${selectedPollutant}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: ${color};">{AQI}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${concentrationValue} μg/m³</td>
                  </tr>
                </table>
              </div>
            `,
          }),
        });

        view.graphics.add(pointGraphic);
      });

      return () => view && view.destroy();
    }
  }, [mapDiv, markers, selectedPollutant]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Dropdown for pollutant selection */}
      <select
        value={selectedPollutant}
        onChange={(e) => setSelectedPollutant(e.target.value)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          background: "white",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <option value="AQI">AQI</option>
        <option value="PM2.5">PM2.5</option>
        <option value="PM10">PM10</option>
        <option value="O3">Ozone (O3)</option>
      </select>

      {/* Map container */}
      <div className={`m-0 p-0 ${width} ${height}`} ref={mapDiv}></div>
    </div>
  );
};

export default ArcGIS;
