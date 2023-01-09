import axios from 'axios'
import { React, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AccommsSection from './AccommsSection'
import Navbar from './Navbar'
import accommodations from './utils/accommodations'

const AddNewStudent = () => {
	const { presentation, response, scheduling, setting } = accommodations

	const [studentFinished, setStudentFinished] = useState(false)

	let accommodationsToSend = []
	function handleChange(name) {
		accommodationsToSend.push(name)
		console.log(accommodationsToSend)
	}
	async function postNewAccommodations(e) {
		e.preventDefault()
		const response = await axios.post('/api/student/addNewAccommodations', {
			accommodationsToSend,
		})
		console.log(response.data)
	}
	return studentFinished ? (
		<Navigate to="/Dashboard" />
	) : (
		<>
			<Navbar />
			<form onSubmit={postNewAccommodations}>
				<AccommsSection
					name={'Presentation'}
					data={presentation}
					handleChange={handleChange}
				/>
				<AccommsSection
					name={'Response'}
					data={response}
					handleChange={handleChange}
				/>
				<AccommsSection
					name={'Setting'}
					data={setting}
					handleChange={handleChange}
				/>
				<AccommsSection
					name={'Scheduling'}
					data={scheduling}
					handleChange={handleChange}
				/>
				<input type="submit" value="Submit Accommodations" />
			</form>

			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewStudent
