import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./slices/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './Context/SearchProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SearchProvider>
    <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </SearchProvider>
  </Provider>
);


