export async function getCurrentWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return data;
}
