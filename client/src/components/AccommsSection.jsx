import React from 'react'

const AccommsSection = ({ name, data, handleChange }) => {
	return (
		<>
			<h1>{name}</h1>
			{Object.keys(data).map((title, index) => {
				return (
					<section key={index}>
						<h3>{title}</h3>
						{data[title].map((option, index) => {
							return (
								<label key={index} htmlFor={option}>
									{option}
									<input
										type="checkbox"
										onChange={() => handleChange(option)}
									/>
								</label>
							)
						})}
					</section>
				)
			})}
		</>
	)
}

export default AccommsSection
