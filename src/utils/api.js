import { getToken } from "./token";
import { checkResponse } from "./weatherApi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export function getUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
}

export function patchUser({ name, avatar }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(checkResponse);
}

export function getItems() {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export function addItem({ name, weather, imageUrl }) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
}

export function deleteItem({ cardId }) {
  return fetch(`${BASE_URL}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ cardId }),
  }).then(checkResponse);
}

export function addCardLike({ cardId }) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ cardId }),
  }).then(checkResponse);
}

export function removeCardLike({ cardId }) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ cardId }),
  }).then(checkResponse);
}
