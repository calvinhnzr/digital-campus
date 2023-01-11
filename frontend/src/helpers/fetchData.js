// fetch-data.js
export async function fetchData(method, url) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}