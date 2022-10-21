import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SidebarContextProvider } from './context/sidebarContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

