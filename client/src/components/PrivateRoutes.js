import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
	let user = localStorage.getItem('user')
	let auth = localStorage.getItem('auth') === JSON.parse(user)._id

	console.log(auth ? 'logged in' : 'not a user')
	return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
