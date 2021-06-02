import { useState, createContext, useContext } from 'react';
import { SearchBarContext } from '../components/layout/components/Context/SearchBarContext';

const useSearchBar = () => {
  const searchBar = useContext(SearchBarContext);
};

export default useSearchBar;
