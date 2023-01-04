import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = () => {
	const [emailToSend, setEmailToSend] = useState(null)
	const [password, setPassword] = useState(null)
	const [warning, setWarning] = useState(null)
	const [auth, setAuth] = useState(null)

	useEffect(() => {
		let user = localStorage.getItem('user')
		setAuth(localStorage.getItem('auth') === JSON.parse(user)._id)
	}, [])

	async function Login(e) {
		e.preventDefault()
		const response = await axios.post('/api/login', {
			email: emailToSend,
			password: password,
		})
		const { user } = await response.data
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			localStorage.setItem('auth', user._id)
			setAuth(true)
		} else {
			localStorage.setItem('user', 'none')
			localStorage.setItem('auth', false)
		}
	}

	{
		return auth ? (
			<Navigate to="/dashboard" props={setAuth} />
		) : (
			<>
				{warning ? warning : ''}
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
}

export default Login
