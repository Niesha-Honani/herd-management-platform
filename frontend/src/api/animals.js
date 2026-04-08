export async function getAnimals(accessToken, herdId) {
  let url = "http://127.0.0.1:8000/api/animals/";
  if (herdId) {
    url += `?herd=${herdId}`;
  }
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch animals");
  }
  return data;
}

export async function createAnimal(formData, accessToken) {
  const response = await fetch("http://127.0.0.1:8000/api/animals/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create animal");
  }

  return data;
}
