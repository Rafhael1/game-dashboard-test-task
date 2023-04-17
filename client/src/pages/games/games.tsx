import React, { useEffect, useContext, useState, useMemo } from 'react';
import { Table } from '../../components';
import { GamesContext } from '../../context/gamesContext';
import { CategoriesContext } from '../../context/categoriesContext';
import { isBefore, isAfter, format, parseISO } from 'date-fns'
import filterData from '../../utils/filterData';

const Filter = ({ categories, handleOnChange }: any) => {
  return (
    <> 
     {/* Creation Date  */}
    <div className='p-2 border-b border-slate-700'>
      <h3 className='text-lg mb-2 font-bold'>Creation Date</h3> 
      <div>
        <label htmlFor='startDate'>From</label>  
        <input onChange={(e) => handleOnChange(e)} name='startDate'  type="date" className="mt-1 mb-2 text-sm rounded-lg block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Start date" />
        <label htmlFor='endDate'>To</label>
        <input onChange={(e) => handleOnChange(e)} name='endDate' type="date" className="mt-1 text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="End date" />
      </div>    
    </div> 
    {/* Category */}
    <div className='p-2 border-b border-slate-700'>
      <h3 className='text-lg mb-2 font-bold'>Game Category</h3> 
      <select name='category' onChange={(e) => handleOnChange(e)} className="mt-1 text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500">
        {
          categories?.map((category: any) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))
        }
      </select> 
    </div> 
    </>
  )
};

const Customers = () => {
  const { gamesData, getGames, loading } = useContext(GamesContext);
  const { categories, getCategories } = useContext(CategoriesContext);
  
  const [gamesDataAux, setGamesDataAux] = useState<any>([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const filterGames = (filter: any) => {
    const filteredData = filterData(gamesData.data, filter);
    setGamesDataAux({
      ...gamesData,
      data: filteredData,
    });
  };

  useMemo(() => {
    filterGames(filter);
  }, [filter]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const tableColumns = [
    {
      label: 'Name',
      selector: 'game_name',
    },
    {
      label: 'Category',
      selector: 'category',
    },
    {
      label: 'Created At',
      selector: 'createdAt',
      format: (row: any) => format(parseISO(row.createdAt), "dd/MM/yyyy")
    }
  ];

  useEffect(() => {
    if(gamesData){
      setGamesDataAux(gamesData);
    }
  }, [gamesData]);

  useEffect(() => {
    getGames();
    getCategories();
  }, []);

  return (
    <Table
      columns={tableColumns}
      data={gamesDataAux.data}
      filter={<Filter handleOnChange={handleOnChange} categories={categories} />}
      isLoading={loading}
    />
  )
};

export default Customers;