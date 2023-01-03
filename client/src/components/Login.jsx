import axios from 'axios'
import { useState } from 'react'

const Login = () => {
	const [emailToSend, setEmailToSend] = useState(null)
	const [password, setPassword] = useState(null)
	async function Login(e) {
		e.preventDefault()
		const response = await axios.post('/api/login', {
			email: emailToSend,
			password: password,
		})
		const { _id, email, firstName } = await response.data
		localStorage.setItem('_id', _id || null)
		localStorage.setItem('email', email || null)
		localStorage.setItem('firstName', firstName || null)
	}
	return (
		<>
			<form onSubmit={(e) => Login(e)} method="POST">
				<label htmlFor="email"></label>{' '}
				<input
					type="text"
					onChange={(e) => setEmailToSend(e.target.value)}
					name="email"
					id=""
				/>
				<label htmlFor="password"></label>
				<input
					type="text"
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					id=""
				/>
				<input type="submit" value="GO!" />
			</form>
		</>
	)
}

export default Login
