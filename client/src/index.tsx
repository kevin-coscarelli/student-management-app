import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './AppRouter';

const App = () => {
  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
};
// @ts-expect-error
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
