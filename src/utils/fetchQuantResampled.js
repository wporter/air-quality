// src/utils/fetchQuantResampled.js
export async function fetchQuantResampled(sn) {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const startDate = yesterday.toISOString().split("T")[0]; // YYYY-MM-DD
  const endDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

  const authHeader = "Basic " + btoa(`${process.env.QUANTAQ_API_KEY}:`);

  const response = await fetch(
    `https://api.quant-aq.com/v1/data/resampled/?sn=${sn}&start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`QuantAQ resampled fetch failed: ${response.status}`);
  }

  const json = await response.json();
  return json.data || [];
}
