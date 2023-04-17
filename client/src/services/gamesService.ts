import { Game } from "../interfaces/games";
import requester from "../utils/requester";

export const getGames = async() => {
  try {
    return (await requester.get('/games'))?.data;
  } catch (error) {
    throw error;
}};

export const addGame = async(game: Game) => {
  try {
    return (await requester.post('/games', game))?.data;
  } catch (error) {
    throw error;
}}

export const editGame = async(id: number, game: Game) => {
  try {
    return (await requester.put(`/games/${id}`, game))?.data;
  } catch (error) {
    throw error;
}}

export const deleteGame = async(id: number) => {
  try {
    return (await requester.delete(`/games/${id}`))?.data;
  } catch (error) {
    throw error;
}}