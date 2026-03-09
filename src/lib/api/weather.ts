export async function getWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=30.24&longitude=75.84&current_weather=true",
      { cache: "no-store" }
    );

    const data = await res.json();

    return {
      temp: data.current_weather.temperature,
      wind: data.current_weather.windspeed,
    };

  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
}