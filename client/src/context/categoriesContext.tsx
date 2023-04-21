import React, { createContext, useState } from 'react';
import * as categoriesService from '../services/categoriesService';

interface CategoriesProviderProps {
  children: React.ReactNode;
}

interface CategoriesContextProps {
  categories?: {
    id: number;
    name: string;
  }[];
  getCategories: () => Promise<void>;
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: [],
  getCategories: async () => {},
  loading: true,
});

const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async() => {
    const data = await categoriesService.getCategories();
    setCategories(data?.data);
    setLoading(false);
  };

  return (
    <CategoriesContext.Provider value={{ categories, getCategories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext, CategoriesProvider };