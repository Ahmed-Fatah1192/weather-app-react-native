import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { fetchWeather } from '../../api/weather';
import { WeatherResponse } from '../../types';

export default function CityDetailScreen() {
  const { cityName } = useLocalSearchParams<{ cityName: string }>();
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setWeather(null);
    fetchWeather(cityName)
      .then(setWeather)
      .catch((e) => setError(e.message));
  }, [cityName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cityName}</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : !weather ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text>{weather.weather[0]?.description}</Text>
          <Text>Humidity: {weather.main.humidity}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  temp: { fontSize: 40 },
  error: { color: 'red' },
});