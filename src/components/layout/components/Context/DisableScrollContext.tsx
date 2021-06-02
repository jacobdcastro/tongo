import React, { createContext, useEffect, useState } from 'react';

interface DisableScrollObj {
  scrollIsDisabled: boolean;
  setScrollIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Context
export const DisableScrollContext = createContext<DisableScrollObj>({
  scrollIsDisabled: false,
});

interface PropTypes {
  children: JSX.Element[] | JSX.Element;
}

// Component
const DisableScrollContextProvider = ({ children }: PropTypes): JSX.Element => {
  const [scrollIsDisabled, setScrollIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.maxWidth = '100vw';
      if (scrollIsDisabled) {
        // When the modal is shown, we want a fixed body
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100vw';
      } else {
        // When the modal is hidden, we want to remain at the top of the scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [scrollIsDisabled]);

  return (
    <DisableScrollContext.Provider
      value={{ scrollIsDisabled, setScrollIsDisabled }}
    >
      {children}
    </DisableScrollContext.Provider>
  );
};

export default DisableScrollContextProvider;
