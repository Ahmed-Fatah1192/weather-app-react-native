export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface SavedCity {
  id: string;
  cityName: string;
  nickname: string;
}