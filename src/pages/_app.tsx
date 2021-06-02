import React from 'react';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import useStore from '../hooks/useStore';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { styledTheme, muiTheme } from '../utils/themes';
import { ReactQueryDevtools } from 'react-query-devtools';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/index.scss';
import '../styles/reset.scss';
// import GeoLocationHandler from '../components/layout/GeoLocationHandler';
import Head from 'next/head';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import DisableScrollContextProvider from '../components/layout/components/Context/DisableScrollContext';

const googleAnalyticsScript = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-0MGTZ76TQN');`;

// react-query utils
const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App({ Component, pageProps }: AppProps): JSX.Element {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        {/*  Global site tag (gtag.js) - Google Analytics  */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0MGTZ76TQN"
        ></script>
        <script>{googleAnalyticsScript}</script>
      </Head>
      <ReduxProvider store={store}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Hydrate state={pageProps.dehydratedState}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={muiTheme}>
                <StyledThemeProvider theme={styledTheme}>
                  {/* <GeoLocationHandler> */}
                  <DisableScrollContextProvider>
                    <Component {...pageProps} />
                  </DisableScrollContextProvider>
                  {/* </GeoLocationHandler> */}
                </StyledThemeProvider>
              </MuiThemeProvider>
            </MuiPickersUtilsProvider>

            {/* hide react-query devtools in prod */}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </Hydrate>
        </ReactQueryCacheProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
