import { isBefore, isAfter, format, parseISO } from 'date-fns'

const filterData = (data: any, filter: any) => {
  const { startDate, endDate, category } = filter;
  let filteredData;

  if(startDate.length > 0 && endDate.length > 0 && data){
    const filteredDataByDate = data?.filter((game: any) => {
      const creationDate = parseISO(game.createdAt);
      const isAfterStartDate = isAfter(creationDate, parseISO(startDate));
      const isBeforeEndDate = isBefore(creationDate, parseISO(endDate));
      const isSameDate = creationDate.getTime() === parseISO(startDate).getTime() || creationDate.getTime() === parseISO(endDate).getTime();
      return isAfterStartDate && (isBeforeEndDate || isSameDate);
    });
    filteredData = filteredDataByDate;
  }
  if(category){
    const dataToFilter = filteredData ? filteredData : data;
    const filteredDataByCategory = dataToFilter?.filter((game: any) => game.category === category);
    filteredData = filteredDataByCategory;
  }

  if(filteredData) {
    return filteredData;
  }
  return data;
};

export default filterData;