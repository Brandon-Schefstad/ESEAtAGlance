import axios from 'axios'
import React, { useState } from 'react'
const FileUploder = () => {
	const [studentProfile, setStudentProfile] = useState(null)

	async function onSubmit(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('profileImg', studentProfile)
		console.log(formData)
		axios.post('/api/student/addNewStudent', formData, {}).then((res) => {
			console.log(res)
		})
	}
	return (
		<div className="container">
			<div className="row">
				<form action="/api/student/addNewStudent" method="POST">
					<h3>React File Upload</h3>
					<div className="form-group">
						<input
							type="file"
							onChange={(e) => setStudentProfile(e.target.files[0])}
						/>
					</div>
					<div className="form-group">
						<button
							className="btn btn-primary"
							type="submit"
							onClick={onSubmit}>
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FileUploder
