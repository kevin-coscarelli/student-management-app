import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from './login/Login'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />
    },
])