export async function getRanches(accessToken) {
  const response = await fetch("http://127.0.0.1:8000/api/ranches/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch ranches");
  }

  return data;
}
