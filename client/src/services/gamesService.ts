import requester from "../utils/requester";

export const getGames = async() => {
  try {
    return (await requester.get('/games'))?.data;
  } catch (error) {
    console.log(error);
}};

export const addGame = async(game: any) => {
  try {
    return (await requester.post('/games', game))?.data;
  } catch (error) {
    console.log(error);
}}

export const editGame = async(id: number, game: any) => {
  try {
    return (await requester.put(`/games/${id}`, game))?.data;
  } catch (error) {
    console.log(error);
}}

export const deleteGame = async(id: number) => {
  try {
    return (await requester.delete(`/games/${id}`))?.data;
  } catch (error) {
    console.log(error);
}}