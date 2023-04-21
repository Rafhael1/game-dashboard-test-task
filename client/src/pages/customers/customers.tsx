import React, { useEffect, useContext, useState } from 'react';
import { IconBase, Table } from '../../components';
import { CustomerContext } from '../../context/customerContext';
import { format, parseISO } from 'date-fns'
import IconButton from '../../components/iconButton/iconButton';
import { faAdd, faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import filterData from '../../utils/filterData';
import ConfirmDialog from '../../components/confirmDialog/confirmDialog';

interface FilterProps {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  values: {
    startDate?: string;
    endDate?: string;
    name: string;
    email: string;
    address: string;
  };
}

const Filter = ({ handleOnChange, values }: FilterProps) => {
  return (
    <> 
     {/* Creation Date  */}
    <div className='p-2'>
      <h3 className='text-lg mb-2 font-bold'>Creation Date</h3> 
      <div>
        <label htmlFor='startDate'>From</label>  
        <input onChange={(e) => handleOnChange(e)} name='startDate'  type="date" className="mt-1 mb-2 text-sm rounded-lg block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Start date" />
        <label htmlFor='endDate'>To</label>
        <input onChange={(e) => handleOnChange(e)} name='endDate' type="date" className="mt-1 text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="End date" />
      </div>    
    </div>
    </>
  )
};

const Customers = () => {
  const { customersData, getCustomers, addCustomer, editCustomer, deleteCustomer, isLoadingSubmit, loading } = useContext(CustomerContext);
  
  const [editId, setEditId] = useState<any>(null); // Used to delete too
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    const filteredData = filterData(customersData?.data, filter);
    setCustomersDataAux({
      ...customersData,
      data: filteredData,
    });
  };

  useEffect(() => {
    filterCustomers(filter);
  }, [filter]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            setEditId(row.id);
            setModalForm({
              name: row.name,
              email: row.email,
              address: row.address,
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

  const handleDeleteCustomer = async() => {
    await deleteCustomer(editId);
    setIsDeleteModalOpen(false);  
  };

  const handleModalSave = async() => {
    if(isEditing && editId){
      await editCustomer(editId, modalForm);
      setIsModalOpen(false);
    } else {
      await addCustomer(modalForm);
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    if(customersData){
      setCustomersDataAux(customersData);
    }
  }, [customersData]);

  useEffect(() => {
    getCustomers();
  }, []);


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
      filter={<Filter values={modalForm} handleOnChange={handleOnChange} />}
      isLoading={loading}
    />
    <Modal disabledSave={false} onConfirm={handleModalSave} loading={isLoadingSubmit} title={isEditing ? 'Edit Customer' : 'Create Customer'} handleClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="name">Name</label>
          <input onChange={handleOnChangeModal} value={modalForm.name} type="text" name="name" id="name" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="email">Email</label>
          <input onChange={handleOnChangeModal} value={modalForm.email} type="email" name="email" id="email" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Email" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className='text-white' htmlFor="address">Address</label>
          <input onChange={handleOnChangeModal} value={modalForm.address} type="text" name="address" id="address" className="text-sm rounded-lg  block w-full pl-2 p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500" placeholder="Address" />
        </div>
      </div>
    </Modal>
    {/* Delete Confirm Modal */}
    <ConfirmDialog
      title="Delete Customer"
      message="Are you sure you want to delete this customer?"
      isOpen={isDeleteModalOpen}
      loading={isLoadingSubmit}
      onConfirm={handleDeleteCustomer}
      onClose={() => setIsDeleteModalOpen(false)}
    >
    </ConfirmDialog>
    </>
  )
};

export default Customers;