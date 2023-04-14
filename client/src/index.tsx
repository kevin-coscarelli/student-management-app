import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './AppRouter';
import { MantineProvider } from '@mantine/core';

const App = () => {
  return (
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
  );
};
// @ts-expect-error
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
