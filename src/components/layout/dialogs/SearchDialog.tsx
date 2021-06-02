import React, { useContext } from 'react';
import styled from 'styled-components';
import DialogFooter from '../components/DialogFooter';
import BrandFilter from '../components/BrandFilter';
import { PageHeading } from '../../general/headings';
import { useQuery } from 'react-query';
import { getAllPopularSearches } from '../../../lib/popularSearches';
import Loader from '../../general/Loader';
import { SearchBarContext } from '../components/Context/SearchBarContext';
import { initSearch } from '../../../lib/searchBar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useWindowHeight } from 'window-dimensions-hooks';
import popularSearches from '../../../../data/popular-searches';

interface SearchDialogWrapperStyledProps {
  isActive: boolean;
  height: number;
}

const SearchDialogWrapper = styled.div<SearchDialogWrapperStyledProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg};
  z-index: 5;
  top: ${props => (props.isActive ? '0' : '100px')};
  pointer-events: ${props => (props.isActive ? 'auto' : 'none')};
  height: ${props => `${props.height}px`};
  width: 100%;
  margin: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: 500ms;
  opacity: ${props => (props.isActive ? 1 : 0)};

  .searchFiller {
    content: '';
    width: 100%;
    height: 60px;
  }

  main {
    padding: 15px;
    margin-top: 18px;
    flex-grow: 1;
    height: 100%;

    h3 {
      margin: 20px 0 10px;
    }

    .popularItem {
      &:hover {
        background-color: ${props => props.theme.border};
      }
      button {
        border: none;
        background-color: transparent;
        color: ${props => props.theme.hText};
        font-size: 1.175rem;
        margin: 0;
        padding: 0;
      }
      button:hover {
        cursor: pointer;
      }

      a {
        color: ${props => props.theme.hText};
        font-size: 1.175rem;
      }
      padding: 12px 0;
    }
  }

  @media (min-width: 768px) {
    top: ${props => (props.isActive ? '5px' : '-100px')};
    left: 35px;
    height: 595px;
    width: 350px;
    box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    main {
      margin-top: 45px;
    }
  }
`;

interface PropTypes {
  isActive: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDialog = ({ isActive, toggleSearch }: PropTypes): JSX.Element => {
  // const popularSearches = useQuery(
  //   'popular-search-list',
  //   getAllPopularSearches
  // );
  const { popularSearchId, setValueAndPopSearch } = useContext(
    SearchBarContext
  );
  const router = useRouter();
  const height = useWindowHeight();

  // search bar found in Ssr page layout
  return (
    <SearchDialogWrapper isActive={isActive} height={height}>
      <div className="searchFiller" />
      <main>
        <BrandFilter />
        <PageHeading headerType="h3" uppercase>
          Popular Searches
        </PageHeading>
        <ul>
          {popularSearches
            // .sort((a, b) => a.id - b.id)
            .map((item, index) =>
              item.id === 3 ? null : (
                <li className="popularItem" key={index}>
                  <Link
                    href={{
                      pathname: `/explore/${item.id}`,
                    }}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                      <button
                        onClick={() => {
                          setValueAndPopSearch({
                            value: item.name,
                            popularSearchId: item.id,
                          });
                          initSearch(popularSearchId, router);
                          toggleSearch(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </a>
                  </Link>
                </li>
              )
            )}
        </ul>
      </main>

      <DialogFooter
        handleSubmit={async () => {
          initSearch(popularSearchId, router);
          toggleSearch(false);
        }}
        handleCancel={() => {
          setValueAndPopSearch({ value: '', popularSearchId: null });
          toggleSearch(false);
        }}
        isSearch
      />
    </SearchDialogWrapper>
  );
};

export default SearchDialog;
