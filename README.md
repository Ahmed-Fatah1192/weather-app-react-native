# Weather App with Saved Cities (React Native + Expo)

A React Native rebuild of my [Kotlin/Jetpack Compose weather app](https://github.com/Ahmed-Fatah1192/weather-app-compose)  same concept, same features, deliberately re-implemented in a second stack to practice both platforms side by side.

Users log in, save cities they care about, and check live current weather for each one.

## Features

- **Local login screen**  simple local/mock authentication (not a real backend auth system)
- **Live weather data**  fetches current temperature, conditions, and humidity from the OpenWeatherMap API
- **Saved cities with full CRUD**  add a city, view the saved list, tap in for live weather detail, edit a city's name (with the edit genuinely correcting the stored data, not just a cosmetic label), and remove a city
- **Local persistence**  saved cities stored with AsyncStorage, surviving app restarts
- **File-based navigation**  built with Expo Router; each screen is a file under `app/`
- **Proper loading/error states**  a misspelled or invalid city name shows a clear error message instead of crashing or failing silently

## Tech Stack

- **React Native** + **Expo** (Expo Router for navigation)
- **TypeScript**
- **AsyncStorage**  local key-value persistence
- **React Context + hooks** (`useState`, `useEffect`, `useContext`) — state management
- Native `fetch` for networking (no extra HTTP library needed)

## What I practiced building this

- Comparing the same app architecture across two different mobile stacks: Repository/ViewModel (Kotlin) vs. Context + hooks (React Native)
- React Native/Expo's file-based routing (Expo Router) versus manually configuring a navigation graph
- TypeScript fundamentals, interfaces, generics, nullable types, as a superset of the JavaScript I originally learned
- Handling async data fetching and proper loading/error states, not just the happy path
- Keeping an API key out of version control using Expo's `EXPO_PUBLIC_` environment variable convention
- Debugging a real bug where an "Update" (rename) operation only changed a cosmetic label instead of the actual underlying data — and fixing it properly

## Getting Started

Clone the repo:

```bash
git clone https://github.com/Ahmed-Fatah1192/weather-app-react-native.git
cd weather-app-react-native
npm install
```

You'll need your own free OpenWeatherMap API key (openweathermap.org) create a `.env` file in the project root:
```
EXPO_PUBLIC_WEATHER_API_KEY=your_key_here
```

Then run:
```bash
npx expo start
```
Scan the QR code with the Expo Go app on your phone.

## Screenshots

*(add a screenshot or short gif of the app here)*
