import { useState } from 'react';

export interface UseQueryCountReturn {
  queryCount: number;
  handleQueryCompletion: () => void;
  resetCount?: () => void;
}

const useQueryCount = (): UseQueryCountReturn => {
  const [queryCount, setQueryCount] = useState<number>(0);
  const handleQueryCompletion = () => setQueryCount(queryCount + 1);
  const resetCount = () => setQueryCount(0);

  return { queryCount, handleQueryCompletion, resetCount };
};

export default useQueryCount;
