const Student = require('../../models/Student');
const Accommodations = require('../../models/Accommodations');
const {
  presentation,
  response,
  setting,
  scheduling,
} = require('../utils/accommodations');

module.exports = {
  addAccommodations: async (req, res) => {
    try {
      if (req.cookies.ID != 'undefined') {
        res.redirect('/student/addAccommodations/' + req.cookies.ID);
      } else if (Object.keys(req.query).length > 0) {
        res.redirect('/student/addAccommodations/' + req.query.ID);
      } else {
        res.render('addAccommodations');
      }
    } catch (err) {
      console.error(err);
    }
  },
  addAccommodationsLoaded: async (req, res) => {
    if (req.cookies.ID) {
      const student = await Student.find({
        ID: req.params.id,
      }).populate({
        path: 'accommodations',
      });
      if (student.length != 0) {
        res.render('addAccommodationsLoaded.pug', {
          data: {
            student: student,
            accommodations: [
              { presentation: presentation },
              { response: response },
              { scheduling: scheduling },
              { setting: setting },
            ],
          },
        });
      } else {
        res.render('addAccommodations');
      }
    } else {
      res.render('addAccommodations');
    }
  },
  loadAccommodations: async (req, res) => {
    res.render('addAccommodations');
  },
  postAccommodations: async (req, res) => {
    try {
      // Identify a student
      let student = await Student.findOne({
        ID: req.body.ID,
      }).populate('accommodations');
      // Make array of Accommodation names, sans ID
      let accommodationArray = Object.keys(req.body).filter((element) => {
        return element !== 'ID';
      });
      const checkArr = student.accommodations.map((accomm) => {
        return accomm.name;
      });
      await student.updateOne({
        $unset: { accommodations: 1 },
      });
      for (let i = 0; i < accommodationArray.length; i++) {
        const accomm = await Accommodations.create({
          student: student._id,
          name: accommodationArray[i],
          date: Date.now(),
        });
        await student.updateOne({
          $push: { accommodations: accomm },
        });
      }

      res.redirect('/student/addAccommodations/' + req.body.ID);
    } catch (error) {
      console.error(error);
    }
  },
};
