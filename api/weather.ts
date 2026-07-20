import { WeatherResponse } from '../types';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export async function fetchWeather(cityName: string): Promise<WeatherResponse> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not find weather for "${cityName}"`);
  }

  return response.json();
}