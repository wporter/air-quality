/* eslint-disable camelcase */
export const api = async (method, url, headers) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
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

  const {
    rh,
    sn,
    temp,
    timestamp_local,
    co,
    co2,
    no,
    no2,
    o3,
    pm1,
    pm10,
    pm25,
  } = data[0];

  return {
    meta: {
      sn,
    },
    data: {
      "Relative Humidity": rh ? `${rh}%` : "Not Available",
      Temperature: temp ? `${temp}°C` : "Not Available",
      Timestamp: new Date(timestamp_local).toLocaleTimeString(),
      "Carbon Monoxide": co ? `${co} ppb` : "Not Available",
      "Carbon Dixiode": co2 ? `${co2} ppm` : "Not Available",
      "Nitric Oxide": no ? `${no} ppb` : "Not Available",
      "Nitrogen Dioxide": no2 ? `${no2} ppb` : "Not Available",
      Ozone: o3 ? `${o3} ppm` : "Not Available",
      "PM 1": `${pm1} μg/m³`,
      "PM 2.5": `${pm25} μg/m³`,
      "PM 10": `${pm10} μg/m³`,
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
  const { data } = await api(
    "GET",
    "https://api.quant-aq.com/device-api/v1/data/most-recent/?network_id=11",
    {
      Authorization: "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`),
    },
  );

  const items = data.map(({ geo, sn, timestamp_local, pm1, pm10, pm25 }) => ({
    geo,
    sn,
    timestamp_local,
    measurements: { pm1, pm10, pm25 },
  }));

  return { items };
};
