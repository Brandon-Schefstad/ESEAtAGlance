import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
	const [auth, setAuth] = useState(true)
	const [students, setStudents] = useState()

	{
		return !auth ? (
			<Navigate to="/login" />
		) : (
			<>
				<div>Dashboard</div>
				<button
					onClick={() => {
						localStorage.setItem('auth', false)
						localStorage.setItem('user', false)
						setAuth(false)
					}}>
					Logout
				</button>
			</>
		)
	}
}

export default Dashboard
