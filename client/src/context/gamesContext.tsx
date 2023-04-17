import React, { createContext, useState } from 'react';
import * as gamesService from '../services/gamesService';
import { isBefore, isAfter, parseISO } from 'date-fns'
import { Game } from '../interfaces/games';

interface GamesProviderProps {
  children: React.ReactNode;
}

interface GamesContextProps {
  gamesData: { meta: any; data: Game[]};
  getGames: () => Promise<void>;
  loading: boolean;
}

const GamesContext = createContext<GamesContextProps>({
  gamesData: { meta: {}, data: [] },
  getGames: async () => {},
  loading: true,
});

const GamesProvider = ({ children }: GamesProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState({ meta: {}, data: [] });

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