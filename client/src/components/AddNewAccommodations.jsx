import { React, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'

const AddNewStudent = () => {
	const [studentFinished, setStudentFinished] = useState(false)
	return studentFinished ? (
		<Navigate to="/Dashboard" />
	) : (
		<>
			<Navbar />
			<div>AddNewAccoms</div>
			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewStudent
