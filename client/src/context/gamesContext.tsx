import React, { createContext, useState } from 'react';
import * as gamesService from '../services/gamesService';
import { Game } from '../interfaces/games';
import { toast } from 'react-toastify';

interface GamesProviderProps {
  children: React.ReactNode;
}

interface GamesContextProps {
  gamesData: { meta: any; data: Game[]};
  getGames: () => Promise<void>;
  addGame: (form: Game) => Promise<void | Game>;
  deleteGame: (id: number) => Promise<void | Game>;
  editGame: (id: number, form: Game) => Promise<void | Game>;
  loading: boolean;
  isLoadingSubmit: boolean;
}

const GamesContext = createContext<GamesContextProps>({
  gamesData: { meta: {}, data: [] },
  getGames: async () => {},
  addGame: async (form: Game) => {},
  deleteGame: async (id: number) => {},
  editGame: async (id: number, form: Game) => {},
  loading: true,
  isLoadingSubmit: false,
});

const GamesProvider = ({ children }: GamesProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [gamesData, setGamesData] = useState({ meta: {}, data: [] });
  
  const getGames = async() => {
    try {   
      const games = await gamesService.getGames();
      setGamesData(games);
      setLoading(false);
    } catch (error) {
      toast('Error on fetch games', {
        type: 'error',
      })
    }
  };
  
  const addGame = async (game: Game) => {
    try {
      setIsLoadingSubmit(true);
      await gamesService.addGame(game);
      setIsLoadingSubmit(false);
      toast('Added Game!', {
        type: 'success',
      });
      await getGames();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on add game', {
        type: 'error',
      })
    }
  };

  const editGame = async (id: number, game: Game) => {
    try {
      setIsLoadingSubmit(true);
      await gamesService.editGame(id, game);
      setIsLoadingSubmit(false);
      toast('Edited Game!', {
        type: 'success',
      });
      await getGames();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on edit game', {
        type: 'error',
      })
    }
  };

  const deleteGame = async (id: number) => {
    try {
      setIsLoadingSubmit(true);
      await gamesService.deleteGame(id);
      setIsLoadingSubmit(false);
      toast('Deleted Game!', {
        type: 'success',
      });
      await getGames();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on delete game', {
        type: 'error',
      })
    }
  };


  return (
    <GamesContext.Provider value={{ gamesData, editGame, deleteGame, addGame, getGames, loading, isLoadingSubmit }}>
      {children}
    </GamesContext.Provider>
  );
}

export { GamesContext, GamesProvider };