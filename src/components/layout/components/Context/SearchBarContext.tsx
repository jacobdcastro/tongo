import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect } from 'react';
import { SearchBarObj } from '../../../../@types/searchBar';

export const SearchBarContext = createContext<SearchBarObj>({
  value: '',
  popularSearchId: null,
});

interface PropTypes {
  children: JSX.Element[] | JSX.Element;
}

const SearchBarContextProvider = ({ children }: PropTypes): JSX.Element => {
  const router = useRouter();
  const [searchObj, setSearchObj] = useState<SearchBarObj>({
    value: '',
    popularSearchId: null,
    setValue: val => setSearchObj({ ...searchObj, value: val }),
    setPopularSearchId: id =>
      setSearchObj({ ...searchObj, popularSearchId: id }),
    setValueAndPopSearch: ({ value, popularSearchId }) =>
      setSearchObj({ ...searchObj, value, popularSearchId }),
  });

  useEffect(() => {
    if (router.pathname === '/') setSearchObj({ ...searchObj, value: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <SearchBarContext.Provider value={searchObj}>
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarContextProvider;
