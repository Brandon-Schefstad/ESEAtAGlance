import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoutes from './components/PrivateRoutes'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoutes />}>
				<Route path={'/'} element={<Login />}></Route>
				<Route path={'/dashboard'} element={<Dashboard />}></Route>
			</Route>
			<Route element={<Login />} path="/login" />
		</>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
