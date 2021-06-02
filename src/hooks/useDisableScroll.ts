import { useContext } from 'react';
import { DisableScrollContext } from '../components/layout/components/Context/DisableScrollContext';

type UseDisableScroll = () => (isDisabled: boolean) => void;

const useDisableScroll: UseDisableScroll = () => {
  const { setScrollIsDisabled } = useContext(DisableScrollContext);

  return (isDisabled: boolean) => setScrollIsDisabled(isDisabled);
};

export default useDisableScroll;
