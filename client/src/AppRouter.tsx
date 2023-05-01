import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from './login/Login'
import { Home } from './Home/Home'
import React from 'react'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
        loader: async () => {
            const carreer = await fetch('http://localhost:8081/api/carreers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }                    
            })
            return carreer.json()
        },
    }
])