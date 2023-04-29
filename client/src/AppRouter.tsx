import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from './login/Login'
import { getCookie } from './helpers'

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
        element: <div><h1>Home</h1></div>,
        loader: () => {
            // Query para probar autenticacion. Deshechar mas adelante.
            const jwt = getCookie('jwt')
            console.log(jwt)
            fetch('http://localhost:8081/api/auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${jwt}`
                },
            })
            return null
        },
    }
])