import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AddNewAccommodations from './AddNewAccommodations'
import Navbar from './Navbar'
const AddNewGoals = ({ student_id }) => {
	const [studentFinished, setStudentFinished] = useState(false)
	const [goalToSend, setGoalToSend] = useState({
		goalGrade: '0',
	})
	const [success, setSuccess] = useState(false)

	const grades = [
		'Kindergarten',
		'1st Grade',
		'2nd Grade',
		'3rd Grade',
		'4th Grade',
		'5th Grade',
		'6th Grade',
		'7th Grade',
		'8th Grade',
		'9th Grade',
		'10th Grade',
		'11th Grade',
		'12th Grade',
	]
	const domains = [
		{ title: 'Curriculum and Learning Environment', value: 'curriculum' },
		{ title: 'Social/Emotional', value: 'social' },
		{ title: 'Independent Functioning', value: 'independent' },
		{ title: 'Healthcare', value: 'healthcare' },
		{ title: 'Communication', value: 'communication' },
	]
	async function postNewGoal(e) {
		e.preventDefault()
		const response = await axios.post('/api/student/addNewGoal', {
			goalToSend,
		})
		if (response.status === 200) {
			setSuccess(true)
		}
	}
	function setStateOnChange(e, name) {
		console.log(goalToSend)
		setGoalToSend(goalToSend, ...(goalToSend[e.target.name] = e.target.value))
	}
	return studentFinished ? (
		<Navigate to="/addNewAccommodations" />
	) : success ? (
		<AddNewAccommodations student_id={student_id} />
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
								name="studentNumber"
								id="studentNumber"
								onChange={(e) => setStateOnChange(e, 'ID')}
							/>
						</label>
					</form>
				)}
			</h1>
			<div>AddNewGoals</div>
			<form onSubmit={postNewGoal}>
				<label htmlFor="goalGrade">
					Grade:
					<select
						name="goalGrade"
						id="goalGrade"
						onChange={(e) => setStateOnChange(e, 'goalGrade')}>
						{grades.map((grade, index) => (
							<option key={index} value={index}>
								{grade}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="domain">
					Grade:
					<select
						name="domain"
						id="domain"
						onChange={(e) => setStateOnChange(e, 'domain')}>
						{domains.map((domain, index) => (
							<option key={index} value={domain.value}>
								{domain.title}
							</option>
						))}
					</select>
				</label>
				<textarea
					cols={30}
					rows={5}
					onChange={(e) => setStateOnChange(e, 'goalText')}
					name="goalText"
				/>
				<input
					type="checkbox"
					onChange={(e) => setStateOnChange(e, 'attained')}
					name="attained"
				/>
				<textarea
					cols={30}
					rows={5}
					onChange={(e) => setStateOnChange(e, 'notes')}
					name="notes"
				/>
				<input type="submit" value="Go" />
			</form>
			<button onClick={() => setStudentFinished(true)}> Move It along</button>
		</>
	)
}

export default AddNewGoals
