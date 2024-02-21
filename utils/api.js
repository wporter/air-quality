export const api = async (method, url, headers) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
  });

  const data = await response.json();

  return data;
};

export const getDataDetails = async (serialNumber) => {
  const response = await api(
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
    // eslint-disable-next-line camelcase
    timestamp,
    co,
    co2,
    no,
    no2,
    o3,
    pm1,
    pm10,
    pm25,
  } = response.data[0];

  return {
    "Serial Number": sn,
    "Relative Humidity": `${rh}%`,
    Temperature: `${temp}°C`,
    // eslint-disable-next-line camelcase
    Timestamp: new Date(
      new Date(timestamp).getTime() - new Date().getTimezoneOffset() * 60000,
    ).toLocaleTimeString(),
    "Carbon Monoxide": `${co} ppb`,
    "Carbon Dixiode": `${co2} ppm`,
    "Nitric Oxide": `${no} ppb`,
    "Nitrogen Dioxide": `${no2} ppb`,
    Ozone: `${o3} ppb`,
    "PM 1": `${pm1} μg/m³`,
    "PM 2.5": `${pm25} μg/m³`,
    "PM 10": `${pm10} μg/m³`,
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

  data.forEach(({ pm1, pm25, pm10, timestamp }) => {
    const local =
      new Date(timestamp).getTime() - new Date().getTimezoneOffset() * 60000;

    PM1.push({ x: local, y: pm1 });
    PM10.push({ x: local, y: pm10 });
    PM25.push({ x: local, y: pm25 });
  });

  return {
    PM1: PM1.reverse(),
    PM10: PM10.reverse(),
    PM25: PM25.reverse(),
  };
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
