import React, { useEffect, useContext, useState, useMemo } from 'react';
import { IconBase, Table } from '../../components';
import { GamesContext } from '../../context/gamesContext';
import { CategoriesContext } from '../../context/categoriesContext';
import { format, parseISO } from 'date-fns'
import filterData from '../../utils/filterData';
import Button from '../../components/button/button';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from '../../components/confirmDialog/confirmDialog';
import Modal from '../../components/modal/modal';
import IconButton from '../../components/iconButton/iconButton';
import { Game } from '../../interfaces/games';

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
        <option value=''>All</option>
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

const Games = () => {
  const { gamesData, addGame, editGame, deleteGame, getGames, isLoadingSubmit, loading } = useContext(GamesContext);
  const { categories, getCategories } = useContext(CategoriesContext);
  
  const [canSaveNew, setCanSaveNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number>();
  const [gamesDataAux, setGamesDataAux] = useState<any>([]);
  const [modalForm, setModalForm] = useState({
    game_name: '',
    category: '',
  });
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const filterGames = (filter: any) => {
    const filteredData = filterData(gamesData?.data, filter);
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

  const handleOnChangeModal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setModalForm({
      ...modalForm,
      [e.target.name]: e.target.value,
    });
    setCanSaveNew(!!(modalForm.game_name && modalForm.category));
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
      format: (row: Game) => format(parseISO(row.createdAt || ''), "dd/MM/yyyy")
    },
    {
      label: 'Actions',
      render: (row: Game) => (
        <div className="flex space-x-2">
          <IconButton color="info" onClick={() => {
            setIsEditing(true);
            if(row.id){
              setEditId(row.id);
            }
            setModalForm({
              game_name: row.game_name,
              category: row.category,
            });
            handleOpenModal();

          }}>
            <IconBase icon={faEdit} />
          </IconButton>
          <IconButton color="danger" onClick={() => {
            setIsDeleteModalOpen(true)
            setEditId(row.id);
          }
          }>
            <IconBase icon={faTrash} />
          </IconButton>
        </div>
      )
    }
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if(isEditing){
      setIsEditing(false);
      setModalForm({ game_name: '', category: ''})
    }
    setIsModalOpen(false);
  }

  const handleDeleteGame = async() => {
    if(!editId) return;
    await deleteGame(editId);
    setIsDeleteModalOpen(false);
  };

  const handleModalSave = async() => {
    if(isEditing && editId){
      await editGame(editId, modalForm);
      setIsModalOpen(false);
    } else {
      await addGame(modalForm);
      setIsModalOpen(false);
    }
  }

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
    <>
    <div className='flex mobile:justify-between justify-between mt-0 mb-4 border-b border-slate-700 pb-4'>
      <h1 className='text-3xl mobile:text-2xl font-bold text-white'>Games</h1>
      <Button onClick={handleOpenModal}>
        Add Game
        <IconBase className='ml-2' icon={faAdd} />
      </Button>
    </div>
    <Table
      columns={tableColumns}
      data={gamesDataAux.data}
      filter={<Filter handleOnChange={handleOnChange} categories={categories} />}
      isLoading={loading}
      />
    <Modal disabledSave={!canSaveNew} onConfirm={handleModalSave} loading={isLoadingSubmit} title={isEditing ? 'Edit Game' : 'Create Game'} handleClose={handleCloseModal} isModalOpen={isModalOpen}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="name">Name</label>
          <input onChange={handleOnChangeModal} value={modalForm.game_name} type="text" name="game_name" id="name" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="category">Category</label>
          <select name='category' onChange={handleOnChangeModal} value={modalForm.category} className="mt-1 text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select a category</option>
            {
              categories?.map((category: any) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))
            }
          </select> 
        </div>        
      </div>
    </Modal>
    {/* Delete Confirm Modal */}
    <ConfirmDialog
      title="Delete Game"
      message="Are you sure you want to delete this game?"
      isOpen={isDeleteModalOpen}
      loading={isLoadingSubmit}
      onConfirm={handleDeleteGame}
      onClose={() => setIsDeleteModalOpen(false)}
    >
    </ConfirmDialog>
    </>
  )
};

export default Games;