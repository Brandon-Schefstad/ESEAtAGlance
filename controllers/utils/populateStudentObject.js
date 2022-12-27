const Student = require('../../models/Student')
const separateAccommodationsIntoGroups = require('./separateAccommodationsIntoGroups')
const {
	presentation,
	response,
	setting,
	scheduling,
} = require('./accommodations')

module.exports = async function populateStudentObject(ID) {
	try {
		let student = await Student.findOne({
			ID: ID,
		})
			.populate({
				path: 'history',
			})
			.populate({
				path: 'caseManager',
			})
			.lean()

		let history = [[], [], [], [], [], [], [], [], [], [], [], [], []]
		//TODO:  Array -> Map
		if (student.history) {
			student.history.forEach((goal) => {
				history[parseInt(goal.grade)].push(goal)
			})
		}
		let returnHistory = history.filter((subArr) => {
			return subArr.length > 0
		})

		const studentObject = {
			_id: student._id,
			name: student.firstName + ' ' + student.lastName,
			ID: student.ID,
			grade: student.grade,
			caseManager: student.caseManager.email,
			primary: student.primaryExceptionality,
			history: returnHistory,
			presentationList: separateAccommodationsIntoGroups(
				student.accommodations,
				presentation
			),
			responseList: separateAccommodationsIntoGroups(
				student.accommodations,
				response
			),
			settingList: separateAccommodationsIntoGroups(
				student.accommodations,
				setting
			),
			schedulingList: separateAccommodationsIntoGroups(
				student.accommodations,
				scheduling
			),
			IEP: student.IEPDueDate.toDateString().split(' ').splice(1, 4).join(' '),
			image: student.image,
		}
		if (!studentObject) {
			const errorObject = { error: 'No student was found' }
			return errorObject
		}
		return studentObject
	} catch (error) {
		console.error(error)
	}
}
