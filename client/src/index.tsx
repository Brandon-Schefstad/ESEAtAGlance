import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import './styles/global.css'

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Login />}></Route>
			<Route path="dashboard" element={<Dashboard />}></Route>
		</>
	)
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
