import React, { createContext, useState } from 'react';
import * as customerService from '../services/customerService';
import { isBefore, isAfter, parseISO } from 'date-fns'
import { Customer } from '../interfaces/customer';

interface CustomerProviderProps {
  children: React.ReactNode;
}

interface CustomerContextProps {
  customersData?: { meta: any; data: Customer[]};
  getCustomers: () => Promise<void>;
  loading: boolean;
}

const CustomerContext = createContext<CustomerContextProps>({
  customersData: { meta: {}, data: [] },
  getCustomers: async () => {},
  loading: true,
});

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [customersData, setCustomersData] = useState<any>({ meta: {}, data: [] });

  const getCustomers = async() => {
    const customers = await customerService.getCustomers();
    setCustomersData(customers);
    setLoading(false);
  };

  return (
    <CustomerContext.Provider value={{ customersData, getCustomers, loading }}>
      {children}
    </CustomerContext.Provider>
  );
}

export { CustomerContext, CustomerProvider };