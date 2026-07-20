import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedCity } from '../types';

const STORAGE_KEY = 'saved_cities';

export async function getSavedCities(): Promise<SavedCity[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function addCity(cityName: string): Promise<void> {
  const cities = await getSavedCities();
  const newCity: SavedCity = { id: Date.now().toString(), cityName };
  cities.push(newCity);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export async function removeCity(id: string): Promise<void> {
  const cities = await getSavedCities();
  const filtered = cities.filter((c) => c.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function renameCity(id: string, newCityName: string): Promise<void> {
  const cities = await getSavedCities();
  const updated = cities.map((c) => (c.id === id ? { ...c, cityName: newCityName } : c));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}