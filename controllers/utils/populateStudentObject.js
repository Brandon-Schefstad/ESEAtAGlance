const Student = require('../../models/Student')
const returnAccommodationNames = require('./returnAccommodationNames')
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
			caseManager: student.caseManager.userName,
			primary: student.primaryExceptionality,
			history: returnHistory,
			presentationList: returnAccommodationNames(
				student.accommodations,
				presentation
			),
			responseList: returnAccommodationNames(student.accommodations, response),
			settingList: returnAccommodationNames(student.accommodations, setting),
			schedulingList: returnAccommodationNames(
				student.accommodations,
				scheduling
			),
			IEP: student.IEPDueDate.toDateString().split(' ').splice(1, 4).join(' '),
			image: student.image,
		}
		if (studentObject) {
			return studentObject
		}
		const errorObject = { error: 'No student was found' }
		return errorObject
	} catch (error) {
		console.error(error)
	}
}
