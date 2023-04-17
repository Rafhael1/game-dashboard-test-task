import React, { createContext, useState } from 'react';
import * as gamesService from '../services/gamesService';
import { isBefore, isAfter, parseISO } from 'date-fns'

interface GamesProviderProps {
  children: React.ReactNode;
}

interface GamesContextProps {
  gamesData: any;
  getGames: () => Promise<void>;
  loading: boolean;
}

const GamesContext = createContext<GamesContextProps>({
  gamesData: [],
  getGames: async () => {},
  loading: true,
});

const GamesProvider = ({ children }: GamesProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<any>([]);

  const getGames = async() => {
    const games = await gamesService.getGames();
    setGamesData(games);
    setLoading(false);
  };

  return (
    <GamesContext.Provider value={{ gamesData, getGames, loading }}>
      {children}
    </GamesContext.Provider>
  );
}

export { GamesContext, GamesProvider };