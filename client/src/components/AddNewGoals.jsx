import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AddNewAccommodations from './AddNewAccommodations'
import Navbar from './Navbar'
const AddNewGoals = ({ student_id }) => {
	console.log(student_id)
	const [studentFinished, setStudentFinished] = useState(false)
	const [goalToSend, setGoalToSend] = useState({})

	async function postNewGoal(e) {
		e.preventDefault()
		const response = await axios.post('/api/student/addNewGoal', goalToSend)
		if (response.status === 200) {
			setSuccess(true)
		}
	}
	function setStateOnChange(e, name) {
		setGoalToSend(goalToSend, ...(goalToSend[e.target.name] = e.target.value))
	}
	return studentFinished ? (
		<Navigate to="/addNewAccommodations" />
	) : success ? (
		<AddNewAccommodations student_id={student_id} />
	) : (
		<>
			<Navbar />
			<h1>{student_id ? student_id : 'none'}</h1>
			<div>AddNewGoals</div>
			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewGoals
