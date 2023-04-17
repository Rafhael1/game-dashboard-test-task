import React, { createContext, useState } from 'react';
import * as customerService from '../services/customerService';
import { isBefore, isAfter, parseISO } from 'date-fns'

interface CustomerProviderProps {
  children: React.ReactNode;
}

interface CustomerContextProps {
  customersData: any;
  getCustomers: () => Promise<void>;
  loading: boolean;
}

const CustomerContext = createContext<CustomerContextProps>({
  customersData: [],
  getCustomers: async () => {},
  loading: true,
});

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [customersData, setCustomersData] = useState<any>([]);

  const getCustomers = async() => {
    const customers = await customerService.getCustomers();
    setCustomersData(customers);
    setLoading(false);
  };

  const filterCustomers = (filter: any) => {
    const { startDate, endDate } = filter;
    const filteredCustomers = customersData?.data?.filter((customer: any) => {
      const creationDate = parseISO(customer.createdAt);
      if(startDate.length > 0 && endDate.length > 0){
        console.log('test')
        const isAfterStartDate = isAfter(creationDate, parseISO(startDate));
        const isBeforeEndDate = isBefore(parseISO(endDate), creationDate);
        // const isCategory = customer.categoryId === category;
        return isAfterStartDate && isBeforeEndDate;
      }
    });
    setCustomersData({ ...customersData, data: filteredCustomers });
  };

  return (
    <CustomerContext.Provider value={{ customersData, getCustomers, loading }}>
      {children}
    </CustomerContext.Provider>
  );
}

export { CustomerContext, CustomerProvider };