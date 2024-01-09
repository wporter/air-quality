export const api = async (method, url, headers) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
  });

  const data = await response.json();

  return data;
};
