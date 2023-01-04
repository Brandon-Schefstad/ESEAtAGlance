import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'

const AddNewStudent = () => {
	const [studentFinished, setStudentFinished] = useState(false)
	return studentFinished ? (
		<Navigate to="/addNewGoals" />
	) : (
		<>
			<Navbar />
			<div>AddNewStudent</div>
			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewStudent
