import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AddNewGoals from './AddNewGoals'
import Navbar from './Navbar'
const AddNewStudent = () => {
	const [nextPage, setNextPage] = useState(false)
	const [student_id, setStudent_id] = useState(null)
	const [studentToSend, setStudentToSend] = useState({
		firstName: '',
		lastName: '',
		ID: 0,
		Grade: 0,
		primary: '',
		IEP: Date.now(),
	})
	async function postNewStudent(e) {
		e.preventDefault()
		const response = await axios.post(
			'/api/student/addNewStudent',
			studentToSend
		)
		setStudent_id(response.data.ID)
	}
	function setStateOnChange(e) {
		setStudentToSend(
			studentToSend,
			...(studentToSend[e.target.name] = e.target.value)
		)
	}
	return nextPage ? (
		<Navigate to="/addNewGoals" />
	) : student_id != null ? (
		<AddNewGoals student_id={student_id} />
	) : (
		<>
			<Navbar />
			<form onSubmit={postNewStudent}>
				<input
					type="text"
					onChange={(e) => setStateOnChange(e, 'firstName')}
					name="firstName"
				/>
				<input
					type="text"
					onChange={(e) => setStateOnChange(e)}
					name="lastName"
				/>
				<input type="number" onChange={(e) => setStateOnChange(e)} name="ID" />
				<input
					type="number"
					onChange={(e) => setStateOnChange(e)}
					name="grade"
				/>
				<input
					type="text"
					onChange={(e) => setStateOnChange(e)}
					name="primary"
				/>
				<input type="date" onChange={(e) => setStateOnChange(e)} name="IEP" />

				{/* <input
					type="file"
					id="image"
					onChange={(e) => {
						const fileToSend = e.target.files[0]
						setStudentProfileImage(fileToSend)
					}}
					name="image"
					encType="multipart/form-data"
				/> */}
				<input type="submit" value="Go" />
			</form>
			<button onClick={() => setNextPage(true)}> Move It along</button>
		</>
	)
}

export default AddNewStudent

// TODO - Add image support
