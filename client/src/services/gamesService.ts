import requester from "../utils/requester";

export const getGames = async() => {
  try {
    return (await requester.get('/games'))?.data;
  } catch (error) {
    console.log(error);
}};