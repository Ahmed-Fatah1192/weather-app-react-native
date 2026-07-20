import React, { createContext, useContext, useEffect, useState } from 'react';
import { addCity as addCityStorage, getSavedCities, removeCity as removeCityStorage, renameCity as renameCityStorage } from '../storage/cities';
import { SavedCity } from '../types';

interface AppContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  cities: SavedCity[];
  refreshCities: () => Promise<void>;
  addCity: (cityName: string) => Promise<void>;
  removeCity: (id: string) => Promise<void>;
  renameCity: (id: string, nickname: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cities, setCities] = useState<SavedCity[]>([]);

  const refreshCities = async () => {
    const stored = await getSavedCities();
    setCities(stored);
  };

  useEffect(() => {
    refreshCities();
  }, []);

  const login = (username: string, password: string): boolean => {
    const success = username.trim().length > 0 && password.length >= 4;
    setIsLoggedIn(success);
    return success;
  };

  const addCity = async (cityName: string) => {
    await addCityStorage(cityName);
    await refreshCities();
  };

  const removeCity = async (id: string) => {
    await removeCityStorage(id);
    await refreshCities();
  };

  const renameCity = async (id: string, nickname: string) => {
    await renameCityStorage(id, nickname);
    await refreshCities();
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, login, cities, refreshCities, addCity, removeCity, renameCity }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}