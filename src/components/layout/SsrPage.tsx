import React, { useState, FunctionComponent } from 'react';
import { GetServerSidePropsContext } from 'next';
import Header from './header';
import AllDialogs from './dialogs';
import { Dialog } from '../../@types/dialogs';
import PageContent from './PageContent';
import { PageType } from '../../@types/general';
import { useWindowWidth } from 'window-dimensions-hooks';
import SearchBarContextProvider from './components/Context/SearchBarContext';
import useInitialBrandSetter from '../../hooks/useInitialBrandSetter';

interface PropTypes {
  children: JSX.Element[];
  pageType: PageType;
  ctx?: GetServerSidePropsContext;
}

const SsrPage: FunctionComponent = ({ children, pageType }: PropTypes) => {
  const [activeDialog, setActiveDialog] = useState<Dialog | null>(null);
  const windowWidth = useWindowWidth();
  useInitialBrandSetter();

  return (
    <SearchBarContextProvider>
      <AllDialogs
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />

      <Header setActiveDialog={setActiveDialog} />

      <div
        className="headerFiller"
        style={{ height: windowWidth <= 764 ? '125px' : '95px' }}
      />

      {pageType === 'MAP' ? (
        <PageContent noPadding isMap>
          {children}
        </PageContent>
      ) : (
        <PageContent>{children}</PageContent>
      )}
    </SearchBarContextProvider>
  );
};

export default SsrPage;
