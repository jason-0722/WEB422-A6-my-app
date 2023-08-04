import { getToken } from "./authenticate";

async function fetchData(url, method) {
  const headers = {
    "content-type": "application/json",
    Authorization: `JWT ${getToken()}`,
  };

  const response = await fetch(url, {
    method,
    headers,
  });

  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await fetchData(url, "PUT");
}

export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await fetchData(url, "DELETE");
}

export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return await fetchData(url, "GET");
}

export async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return await fetchData(url, "PUT");
}

export async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return await fetchData(url, "DELETE");
}

export async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return await fetchData(url, "GET");
}
