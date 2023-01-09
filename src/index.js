import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MoralisProvider } from "react-moralis";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


function getLibrary(provider, connector) {
  return new Web3(provider)
}

const THEME = createTheme({
  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none'
    }
  },
  palette: {
    primary: {
      main: '#0f2d3e',
    },
    secondary: {
      main: '#143f46',
    },
    info: {
      main: '#64C5BA',
    },
  },
  typography: {
    "fontFamily": "SGKara",
  }
});



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MoralisProvider appId="kJPCji6y23SsB9SVSdSkBotH8vPkgpXEx48rFVBI" serverUrl="https://ftu3hbz4lrw3.usemoralis.com:2053/server">
              <App />
            </MoralisProvider>
          </Web3ReactProvider>
        </Provider>
      </PersistGate>
    </ThemeProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
