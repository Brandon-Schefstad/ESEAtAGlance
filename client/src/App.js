import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
	const [pokemon, setPokemon] = useState('')
	useEffect(async () => {
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
		setPokemon(response.data)
	}, [])

	return <>{pokemon ? JSON.stringify(pokemon.abilities) : 'None'}</>
}
export default App
