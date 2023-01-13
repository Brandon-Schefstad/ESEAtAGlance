import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'
const AddNewStudent = () => {
	const [student, setStudent] = useState(false)
	const [studentIdToSend, setStudentIdToSend] = useState()
	async function searchStudent(e) {
		e.preventDefault()
		const { data, status } = await axios.get(
			`/api/student/searchStudent/${studentIdToSend}`
		)
		if (status === 200) {
			setStudent(data)
		}
	}
	function makeHeading(index) {
		switch (index) {
			case 0:
				return 'Kindergarten'
			case 1:
				return '1st Grade'
			case 2:
				return '2nd Grade'
			case 3:
				return '3rd Grade'

			default:
				return `${index}th Grade`
		}
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
			{student ? (
				<>
					<h1>Name: {student.name}</h1>
					<h2>Id: {student.ID}</h2>
					<h2>Grade: {student.grade}</h2>
					<h2>Case Manager: {student.caseManager}</h2>
					<h2>Primary Exceptionality: {student.primary}</h2>
					<h2>Presentation</h2>
					{
						<section>
							{student.presentationList.map((entry) => {
								return <span>{entry}</span>
							})}
						</section>
					}
					<h2>Response</h2>
					{
						<section>
							{student.responseList.map((entry) => {
								return <span>{entry}</span>
							})}
						</section>
					}
					<h2>Setting</h2>
					{
						<section>
							{student.settingList.map((entry) => {
								return <span>{entry}</span>
							})}
						</section>
					}
					<h2>Scheduling</h2>
					{
						<section>
							{student.schedulingList.map((entry) => {
								return <span>{entry}</span>
							})}
						</section>
					}
					<h2>Goal History</h2>
					{
						<span>
							{student.history.map((grade, index) => {
								return (
									<>
										<h3>{makeHeading(index)}</h3>
										{grade.map((goal) => {
											return (
												<section>
													<span>{goal.domain}</span>
													<span>{goal.goalText}</span>
													<span>{goal.attained}</span>
													<span>{goal.notes}</span>
													<span>{goal.domain}</span>
												</section>
											)
										})}
									</>
								)
							})}
						</span>
					}
				</>
			) : (
				<></>
			)}
		</>
	)
}

export default AddNewStudent
