import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const Login = () => {
	const [data, setData] = useState<AxiosResponse | null | void>(null)
	async function getFetch() {
		const response = await axios.get('/')
		setData(response)
	}
	useEffect(() => {
		getFetch()
	}, [])
	return (
		<>
			{data ? data.status : 'None'}
			<form action="/login" method="POST">
				<label htmlFor="email"></label> <input type="text" name="email" id="" />
				<label htmlFor="password"></label>
				<input type="text" name="password" id="" />
				<input type="submit" value="GO!" />
			</form>
		</>
	)
}

export default Login
