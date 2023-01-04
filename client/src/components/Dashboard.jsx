import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
const Dashboard = () => {
	const [auth, setAuth] = useState(true)
	const [students, setStudents] = useState()
	async function getDashboard() {
		const response = await axios.get('/api/dashboard', {
			user: localStorage.getItem('auth'),
		})
		const { studentList } = response.data
		setStudents(studentList)
	}
	useEffect(() => {
		getDashboard()
	}, [])

	{
		return !auth ? (
			<Navigate to="/login" />
		) : (
			<>
				<Navbar />
				<div>Dashboard</div>
				<button
					onClick={() => {
						localStorage.setItem('auth', false)
						localStorage.setItem('user', false)
						setAuth(false)
					}}>
					Logout
				</button>
				{students ? (
					students.map((student) => {
						return <li key={student._id}>{JSON.stringify(student)}</li>
					})
				) : (
					<></>
				)}
			</>
		)
	}
}

export default Dashboard
