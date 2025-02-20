/* eslint-disable camelcase */
export const api = async (method, url, headers, body) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};

export const getDataDetails = async (serialNumber) => {
  const { data } = await api(
    "GET",
    `https://api.quant-aq.com/device-api/v1/data/most-recent/?sn=${serialNumber}`,
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  if (!data || data.length === 0) {
    return {
      meta: { sn: serialNumber },
      data: "No data available",
    };
  }

  // Extract fields safely
  const sensorData = data[0];

  const { sn, timestamp_local, pm1, pm10, pm25 } = sensorData;

  // Handle nested data safely
  const rh = sensorData?.met?.rh;
  const temp = sensorData?.met?.temp;

  const co = sensorData?.co ?? "Not Available";
  const co2 = sensorData?.co2 ?? "Not Available";
  const no = sensorData?.no ?? "Not Available";
  const no2 = sensorData?.no2 ?? "Not Available";
  const o3 = sensorData?.o3 ?? "Not Available";

  return {
    meta: { sn },
    data: {
      "Relative Humidity": rh !== undefined ? `${rh}%` : "Not Available",
      Temperature: temp !== undefined ? `${temp}°C` : "Not Available",
      Timestamp: timestamp_local
        ? new Date(timestamp_local).toLocaleTimeString()
        : "Not Available",
      "Carbon Monoxide": co !== "Not Available" ? `${co} ppb` : "Not Available",
      "Carbon Dioxide":
        co2 !== "Not Available" ? `${co2} ppm` : "Not Available",
      "Nitric Oxide": no !== "Not Available" ? `${no} ppb` : "Not Available",
      "Nitrogen Dioxide":
        no2 !== "Not Available" ? `${no2} ppb` : "Not Available",
      Ozone: o3 !== "Not Available" ? `${o3} ppm` : "Not Available",
      "PM 1": pm1 !== undefined ? `${pm1} μg/m³` : "Not Available",
      "PM 2.5": pm25 !== undefined ? `${pm25} μg/m³` : "Not Available",
      "PM 10": pm10 !== undefined ? `${pm10} μg/m³` : "Not Available",
    },
  };
};

export const getLine = async (sn) => {
  const { data } = await api(
    "GET",
    `https://api.quant-aq.com/device-api/v1/devices/${sn}/data/`,
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  const PM1 = [];
  const PM10 = [];
  const PM25 = [];
  const CO = [];
  const CO2 = [];
  const NO = [];
  const NO2 = [];
  const O3 = [];

  data.forEach(({ pm1, pm25, pm10, co, co2, no, no2, o3, timestamp_local }) => {
    PM1.push({ x: timestamp_local, y: pm1 });
    PM10.push({ x: timestamp_local, y: pm10 });
    PM25.push({ x: timestamp_local, y: pm25 });

    if (co !== undefined) {
      CO.push({ x: timestamp_local, y: co });
      CO2.push({ x: timestamp_local, y: co2 });
      NO.push({ x: timestamp_local, y: no });
      NO2.push({ x: timestamp_local, y: no2 });
      O3.push({ x: timestamp_local, y: o3 });
    }
  });

  return [
    {
      data: PM1.reverse(),
      units: "ppb",
      title: "PM 1.0",
    },
    {
      data: PM25.reverse(),
      units: "ppb",
      title: "PM 2.5",
    },
    {
      data: PM10.reverse(),
      units: "ppb",
      title: "PM 10",
    },
    {
      data: CO.reverse(),
      units: "ppb",
      title: "Carbon Monoxide",
    },
    {
      data: CO2.reverse(),
      units: "ppm",
      title: "Carbon Dioxide",
    },
    {
      data: NO.reverse(),
      units: "ppb",
      title: "Nitric Oxide",
    },
    {
      data: NO2.reverse(),
      units: "ppb",
      title: "Nitric Dioxide",
    },
    {
      data: O3.reverse(),
      units: "ppm",
      title: "Ozone",
    },
  ];
};

export const getLocations = async () => {
  const { data, meta } = await api(
    "GET",
    "https://api.quant-aq.com/device-api/v1/devices?network_id=11",
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  return { data, meta };
};

export const getMarkers = async () => {
  try {
    const devicesResponse = await api(
      "GET",
      "https://api.quant-aq.com/device-api/v1/devices/",
      {
        Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
      },
    );

    const devices = devicesResponse.data;
    console.log("Total devices retrieved:", devices.length);

    if (!Array.isArray(devices) || devices.length === 0) {
      console.error("No devices received from API");
      return { items: [] };
    }

    const dataPromises = devices.map(({ sn }) =>
      api(
        "GET",
        `https://api.quant-aq.com/device-api/v1/data/most-recent/?sn=${sn}`,
        {
          Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
        },
      ),
    );

    const allData = await Promise.all(dataPromises);
    console.log("Data for each device retrieved successfully.");

    const items = allData.map((response, index) => {
      const deviceData = response.data[0];
      const device = devices[index];

      if (!deviceData) {
        console.log(`Sensor: ${device.sn}, Timestamp: No data available`);
        return {
          geo: device.geo,
          sn: device.sn,
          timestamp_local: "No data available",
          measurements: { pm1: "N/A", pm10: "N/A", pm25: "N/A" },
          outdoors: device.outdoors, // Include outdoors flag
        };
      }

      const { geo, sn, timestamp_local, pm1, pm10, pm25 } = deviceData;
      // console.log(`Sensor: ${sn}, Timestamp: ${timestamp_local}`);

      return {
        geo,
        sn,
        timestamp_local,
        measurements: { pm1, pm10, pm25 },
        outdoors: device.outdoors,
      };
    });

    return { items };
  } catch (error) {
    console.error("Failed to fetch markers:", error);
    return { items: [] };
  }
};
