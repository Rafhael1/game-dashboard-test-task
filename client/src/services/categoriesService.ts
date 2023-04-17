import requester from "../utils/requester";

export const getCategories = async() => {
  try {
    return (await requester.get('/game-categories'))?.data;
  } catch (error) {
    console.log(error);
}};