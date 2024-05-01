import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addData, addData2 } from '../components/ContextProvider.jsx';
import App from './App.jsx';
import './index.css';
const RootComponent = () => {
   const [key, setKey] = useState('');
  const [key2, setKey2] = useState('');

   const AddDataProvider = addData.Provider;
  const AddData2Provider = addData2.Provider;

   return (
    <React.StrictMode>
       <AddDataProvider value={{ key, setKey }}>
        <AddData2Provider value={{ key2, setKey2 }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AddData2Provider>
      </AddDataProvider>

   
    </React.StrictMode>
  );
};

// Use React.createRoot to render the app
ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);