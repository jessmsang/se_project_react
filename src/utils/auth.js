import { checkResponse } from "./weatherApi";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const register = (
  registerEmail,
  registerPassword,
  registerName,
  avatarUrl
) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: registerEmail,
      password: registerPassword,
      name: registerName,
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
};

export const login = (loginEmail, loginPassword) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  }).then(checkResponse);
};
