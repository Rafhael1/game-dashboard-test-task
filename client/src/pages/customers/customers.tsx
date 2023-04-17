import React, { useEffect, useContext, useState } from 'react';
import { IconBase, Table } from '../../components';
import { CustomerContext } from '../../context/customerContext';
import { CategoriesContext } from '../../context/categoriesContext';
import { format, parseISO } from 'date-fns'
import IconButton from '../../components/iconButton/iconButton';
import { faAdd, faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import filterData from '../../utils/filterData';
import { addCustomer } from '../../services/customerService';


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
      <select onChange={() => console.log('s')} className="mt-1 text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500">
        {
          categories?.map((category: any) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))
        }
      </select> 
    </div> 

    </>
  )
};

const Customers = () => {
  const { customersData, getCustomers, loading } = useContext(CustomerContext);
  const { categories, getCategories } = useContext(CategoriesContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customersDataAux, setCustomersDataAux] = useState<any>([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
  });
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const filterCustomers = (filter: any) => {
    const filteredData = filterData(customersData.data, filter);
    setCustomersDataAux({
      ...customersData,
      data: filteredData,
    });
  };

  useEffect(() => {
    filterCustomers(filter);
  }, [filter]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalForm({
      ...modalForm,
      [e.target.name]: e.target.value,
    });
  };

  const tableColumns = [
    {
      label: 'Name',
      selector: 'name',
    },
    {
      label: 'Email',
      selector: 'email',
    },
    {
      label: 'address',
      selector: 'address',
    },
    {
      label: 'Created At',
      selector: 'createdAt',
      format: (row: any) => format(parseISO(row.createdAt), "dd/MM/yyyy")
    },
    {
      label: 'Actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <IconButton color="info" onClick={() => {
            setIsEditing(true);
            handleOpenModal();

          }}>
            <IconBase icon={faEdit} />
          </IconButton>
          <IconButton color="danger" onClick={() => console.log('edit')}>
            <IconBase icon={faTrash} />
          </IconButton>
        </div>
      )
    }
  ];

  useEffect(() => {
    if(customersData){
      setCustomersDataAux(customersData);
    }
  }, [customersData]);

  useEffect(() => {
    getCustomers();
    getCategories();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalSave = async() => {
    await addCustomer(modalForm);
    setIsModalOpen(false);
  }

  return (
    <>
    <div className='flex mobile:justify-evenly justify-between mt-0 mb-4 border-b border-slate-700 pb-4'>
      <h1 className='text-3xl mobile:text-2xl font-bold text-white'>Customers</h1>
      <Button onClick={handleOpenModal}>
        Create Customer
        <IconBase className='ml-2' icon={faAdd} />
      </Button>
    </div>
    <Table
      columns={tableColumns}
      data={customersDataAux.data}
      filter={<Filter handleOnChange={handleOnChange} categories={categories} />}
      isLoading={loading}
    />
    <Modal onConfirm={handleModalSave} loading={loading} title={isEditing ? 'Edit Customer' : 'Create Customer'} handleClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="name">Name</label>
          <input onChange={handleOnChangeModal} type="text" name="name" id="name" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="email">Email</label>
          <input onChange={handleOnChangeModal} type="email" name="email" id="email" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Email" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="address">Address</label>
          <input onChange={handleOnChangeModal} type="text" name="address" id="address" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Address" />
        </div>
      </div>
    </Modal>
    </>
  )
};

export default Customers;