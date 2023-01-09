import axios from 'axios'
import { React, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AccommsSection from './AccommsSection'
import Navbar from './Navbar'
import accommodations from './utils/accommodations'

const AddNewAccommodations = ({ student_id }) => {
	const { presentation, response, scheduling, setting } = accommodations

	const [studentFinished, setStudentFinished] = useState(false)
	const [studentId, setStudentId] = useState(0)

	let accommodationsToSend = []
	function handleChange(name) {
		accommodationsToSend.push(name)
		console.log(accommodationsToSend)
	}
	async function postNewAccommodations(e) {
		e.preventDefault()
		const { data, status } = await axios.post(
			'/api/student/addNewAccommodations',
			{
				ID: studentId,
				accommodationsToSend,
			}
		)
		if (status === 200) {
			accommodationsToSend = []
			setStudentFinished(true)
		}
	}
	return studentFinished ? (
		<Navigate to="/Dashboard" />
	) : (
		<>
			<Navbar />
			<h1>
				{student_id ? (
					student_id
				) : (
					<form>
						<label htmlFor="studentNumber">
							{' '}
							Enter student number:
							<input
								type="number"
								name="ID"
								id="studentNumber"
								onChange={(e) => setStudentId(e.target.value)}
							/>
						</label>
					</form>
				)}
			</h1>
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

export default AddNewAccommodations
