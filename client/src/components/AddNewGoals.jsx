import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
const AddNewGoals = () => {
	const [studentFinished, setStudentFinished] = useState(false)
	return studentFinished ? (
		<Navigate to="/addNewAccommodations" />
	) : (
		<>
			<Navbar />
			<div>AddNewGoals</div>
			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewGoals
