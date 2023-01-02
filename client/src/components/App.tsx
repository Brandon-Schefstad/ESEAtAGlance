import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export default function App() {
	const [data, setData] = useState<AxiosResponse | null | void>(null)
	async function getFetch() {
		const response = await axios.get('/')
		setData(response)
	}
	useEffect(() => {
		getFetch()
	}, [])

	return <>{data ? data : 'No Data'}</>
}
