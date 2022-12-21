import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

// Init Client from QueryClient() here ...
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider> 
    <QueryClientProvider client={client}>
        <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </React.StrictMode>
    </QueryClientProvider>
 </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
