import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'
const AddNewStudent = () => {
	const [student, setStudent] = useState()
	const [studentIdToSend, setStudentIdToSend] = useState()
	async function searchStudent(e) {
		e.preventDefault()
		const { data, status } = axios.get(
			`/api/student/searchStudent/${studentIdToSend}`
		)
		console.log(status)
		console.log(data)
	}
	return (
		<>
			<Navbar />
			<div>Search</div>
			<form onSubmit={searchStudent}>
				<label
					htmlFor="studentId"
					onChange={(e) => setStudentIdToSend(e.target.value)}>
					Enter Student Id: <input type="number" />
				</label>
			</form>
		</>
	)
}

export default AddNewStudent
