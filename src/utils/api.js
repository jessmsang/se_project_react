const baseUrl = "http://localhost:3001";
const checkError = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkError);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkError);
}

function deleteItem({ cardId }) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
  }).then(checkError);
}

export { getItems, addItem, deleteItem };
