const Student = require('../../models/Student');
const returnAccommodationNames = require('./returnAccommodationNames');
const {
  presentation,
  response,
  setting,
  scheduling,
} = require('../utils/accommodations');

module.exports = async function populateStudentResObject(ID) {
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
      .populate({
        path: 'accommodations',
        match: 'text',
      })
      .lean();
    let history = [[], [], [], [], [], [], [], [], [], [], [], [], []];
    if (student.history) {
      student.history.forEach((goal) => {
        history[parseInt(goal.grade)].push(goal);
      });
    }
    let returnHistory = history.filter((subArr) => {
      return subArr.length > 0;
    });

    const resObject = {
      _id: student._id,
      name: student.firstName + ' ' + student.lastName,
      ID: student.ID,
      grade: student.grade,
      caseManager: student.caseManager.userName,
      primary: student.primaryExceptionality,
      history: returnHistory,
      presentationList: returnAccommodationNames(
        student.accommodations,
        'presentation',
        presentation
      ),
      responseList: returnAccommodationNames(
        student.accommodations,
        'response',
        response
      ),
      settingList: returnAccommodationNames(
        student.accommodations,
        'setting',
        setting
      ),
      schedulingList: returnAccommodationNames(
        student.accommodations,
        'scheduling',
        scheduling
      ),
      IEP: student.IEPDueDate.toDateString().split(' ').splice(1, 4).join(' '),
      image: student.image,
    };
    return resObject;
  } catch (error) {
    console.error(error);
  }
};
