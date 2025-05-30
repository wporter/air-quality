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
import { createRoot } from "react-dom/client";
import { getLine24h } from "@/utils/api";
import Line from "@/components/researcher/data/Line";

const ArcGIS = ({ width, height, markers }) => {
  const mapDiv = useRef(null);
  const [selectedPollutant, setSelectedPollutant] = useState("AQI");
  const pollutantTitleMap = {
    AQI: "AQI",
    "PM2.5": "PM2.5",
    PM10: "PM10",
    O3: "Ozone",
  };

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
        source: [],
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
            return calcAqiColor(pm10AqiVal);
          } else {
            const value =
              selectedPollutant === "PM2.5"
                ? marker.measurements.pm25
                : selectedPollutant === "PM10"
                  ? marker.measurements.pm10
                  : selectedPollutant === "O3"
                    ? marker.measurements.o3
                    : null;

            if (value === null || value === undefined) return "#999999";

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
            ? typeof marker.measurements.pm25 === "number"
              ? marker.measurements.pm25.toFixed(2)
              : "N/A"
            : selectedPollutant === "PM10"
              ? typeof marker.measurements.pm10 === "number"
                ? marker.measurements.pm10.toFixed(2)
                : "N/A"
              : selectedPollutant === "O3"
                ? typeof marker.measurements.o3 === "number"
                  ? marker.measurements.o3.toFixed(2)
                  : "N/A"
                : typeof marker.measurements.pm10 === "number"
                  ? marker.measurements.pm10.toFixed(2)
                  : "N/A";

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
            SN: marker.sn,
          },
          popupTemplate: new PopupTemplate({
            title: `<div style="word-wrap: break-word; max-width: 200px;">{Description}</div><br ></br><p style="font-style: italic; font-weight: 100; font-size: 0.75rem;">
    Last Seen: {LastSeen} minutes ago
  </p>`,
            content: async (feature) => {
              const container = document.createElement("div");

              container.innerHTML = `
      <div style="padding-left: 10px; padding-top: 10px; padding-bottom: 15px;">
        <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 80%;">
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Pollutant</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">AQI</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Concentration</th>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${selectedPollutant}</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: ${color};">${pm10AqiVal}</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${concentrationValue} μg/m³</td>
          </tr>
        </table>
        <div id="chart-container-${marker.sn}" style="height: 250px; width: 100%;"></div>
      </div>
    `;

              try {
                const sn = marker.sn;
                const chartContainer = container.querySelector(
                  `#chart-container-${sn}`,
                );
                const timeseriesData = await getLine24h(sn);

                const pm10Data =
                  timeseriesData.find((d) => d.title === "PM10")?.data || [];

                const aqiData = pm10Data.map((point) => ({
                  x: point.x,
                  y: calcAqi(point.y),
                }));

                // Push a "fake" AQI dataset into the array
                timeseriesData.push({
                  title: "AQI",
                  units: "AQI",
                  data: aqiData,
                });

                const tempDiv = document.createElement("div");
                const root = createRoot(tempDiv);
                const selectedDataset = timeseriesData.find(
                  (d) => d.title === pollutantTitleMap[selectedPollutant],
                );

                root.render(
                  <div style={{ width: "100%", height: "250px" }}>
                    <Line
                      data={selectedDataset?.data || []}
                      title={pollutantTitleMap[selectedPollutant]}
                      units={selectedDataset?.units || ""}
                    />
                  </div>,
                );

                setTimeout(() => {
                  chartContainer.replaceChildren(tempDiv);
                }, 0);
              } catch (error) {
                console.error("Graph render failed:", error);
                const errorDiv = document.createElement("div");
                errorDiv.textContent = "Failed to load graph data";
                errorDiv.style.color = "red";
                errorDiv.style.padding = "10px";
                chartContainer.replaceChildren(errorDiv);
              }

              return container;
            },
          }),
        });

        view.graphics.add(pointGraphic);
      });

      return () => view && view.destroy();
    }
  }, [mapDiv, markers, selectedPollutant]);

  return (
    <div className={`relative ${width} ${height}`}>
      <div className="w-full h-full" ref={mapDiv} />

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
    </div>
  );
};

export default ArcGIS;
