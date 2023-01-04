import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<>
			<ul>
				<Link to={'/addNewStudent'}>
					<li>New Student</li>
				</Link>
				<Link to={'/addNewGoals'}>
					<li>New Goal</li>
				</Link>
				<Link to={'/addNewAccommodations'}>
					<li>New Accommodations</li>
				</Link>
				<Link to={'/searchStudent'}>
					<li>Search a Student</li>
				</Link>
			</ul>
		</>
	)
}

export default Navbar
