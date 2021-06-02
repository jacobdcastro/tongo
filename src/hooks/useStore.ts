import { useMemo } from 'react';
import { initializeStore } from '../redux/store';
import { Store } from 'redux';
import { RootState } from '../@types/redux';

const useStore = (initialState: RootState): Store => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

export default useStore;
