import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { DataProvider, UIProvider } from './providers';
import router from './router';
import './globals.css';
import { GoogleOAuthProvider } from './providers/GoogleOAuthProvider';
import { initMocks } from '../__fixtures__/initMocks';

initMocks();

ReactDOM.createRoot(document.getElementById('root')).render(
  <UIProvider>
    <DataProvider>
      <GoogleOAuthProvider>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </DataProvider>
  </UIProvider>,
);
