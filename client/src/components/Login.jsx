import axios from 'axios'
import { useState } from 'react'

const Login = () => {
	const [data, setData] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	async function Login(e) {
		e.preventDefault()
		const response = await axios.post('/api/login', {
			email: email,
			password: password,
		})
		setData(response)
		console.log(data)
	}
	// useEffect(() => {
	// 	getFetch()
	// }, [])
	return (
		<>
			{data ? data.status : 'None'}
			<form onSubmit={(e) => Login(e)} method="POST">
				<label htmlFor="email"></label>{' '}
				<input
					type="text"
					onChange={(e) => setEmail(e.target.value)}
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
