import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from './login/Login'
import { Dashboard } from './Dashboard/Dashboard'
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
        element: <Dashboard />,
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