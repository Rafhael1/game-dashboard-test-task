import React, { createContext, useState } from 'react';
import * as customerService from '../services/customerService';
import { Customer } from '../interfaces/customer';
import { toast } from 'react-toastify';
interface CustomerProviderProps {
  children: React.ReactNode;
}

interface CustomerContextProps {
  customersData?: { meta: any; data: Customer[]};
  getCustomers: () => Promise<void>;
  addCustomer: (form: Customer) => Promise<void | Customer>;
  deleteCustomer: (id: number) => Promise<void | Customer>;
  editCustomer: (id: number, form: Customer) => Promise<void | Customer>;
  loading: boolean;
  isLoadingSubmit: boolean;
}

const CustomerContext = createContext<CustomerContextProps>({
  customersData: { meta: {}, data: [] },
  getCustomers: async () => {},
  addCustomer: async (form: Customer) => {},
  deleteCustomer: async (id: number) => {},
  editCustomer: async (id: number, form: Customer) => {},
  loading: true,
  isLoadingSubmit: false,
});

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [customersData, setCustomersData] = useState<any>({ meta: {}, data: [] });

  const getCustomers = async() => {
    const customers = await customerService.getCustomers();
    setCustomersData(customers);
    setLoading(false);
  };


  const addCustomer = async (customer: Customer) => {
    try {
      setIsLoadingSubmit(true);
      await customerService.addCustomer(customer);
      setIsLoadingSubmit(false);
      toast('Added Customer!', {
        type: 'success',
      });
      await getCustomers();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on add customer', {
        type: 'error',
      })
    }
  };

  const editCustomer = async (id: number, customer: Customer) => {
    try {
      setIsLoadingSubmit(true);
      await customerService.editCustomer(id, customer);
      setIsLoadingSubmit(false);
      toast('Edited Customer!', {
        type: 'success',
      });
      await getCustomers();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on edit customer', {
        type: 'error',
      })
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      setIsLoadingSubmit(true);
      await customerService.deleteCustomer(id);
      setIsLoadingSubmit(false);
      toast('Deleted Customer!', {
        type: 'success',
      });
      await getCustomers();
    } catch (error) {
      setIsLoadingSubmit(false);
      toast('Error on delete customer', {
        type: 'error',
      })
    }
  };

  return (
    <CustomerContext.Provider value={{ customersData, getCustomers, addCustomer, editCustomer, deleteCustomer, isLoadingSubmit, loading }}>
      {children}
    </CustomerContext.Provider>
  );
}

export { CustomerContext, CustomerProvider };