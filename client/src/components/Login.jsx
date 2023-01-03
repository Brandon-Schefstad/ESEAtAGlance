import axios from 'axios'
import { useState } from 'react'

const Login = () => {
	const [data, setData] = useState(null)
	async function Login(e) {
		e.preventDefault()
		const response = await axios.post('/', {})
		setData(response)
	}
	// useEffect(() => {
	// 	getFetch()
	// }, [])
	return (
		<>
			{data ? data.status : 'None'}
			<form onSubmit={(e) => Login(e)} method="POST">
				<label htmlFor="email"></label> <input type="text" name="email" id="" />
				<label htmlFor="password"></label>
				<input type="text" name="password" id="" />
				<input type="submit" value="GO!" />
			</form>
		</>
	)
}

export default Login
