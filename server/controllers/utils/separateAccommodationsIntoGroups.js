module.exports = (arrayOfAccommodations, listOfTotalAccommodations) => {
	let accommodationsSeparatedByDomain = Object.values(listOfTotalAccommodations)
		.join(',')
		.split(',')
	return arrayOfAccommodations.filter((accommodationName) => {
		return accommodationsSeparatedByDomain.includes(accommodationName)
	})
}
