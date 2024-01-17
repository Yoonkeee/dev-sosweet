import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { DataProvider, UIProvider } from './providers';
import router from './router';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UIProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </UIProvider>,
);
