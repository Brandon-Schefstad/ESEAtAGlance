const Student = require('../models/Student');
const cloudinary = require('../middleware/cloudinary');
const Accommodations = require('../models/Accommodations.js');
const Goal = require('../models/Goals.js');
const dashboard = require('./dashboard.js');
const { ObjectId } = require('mongodb');
const Teacher = require('../models/Teacher');

module.exports = {
	addNewStudent: async (req, res) => {
		res.render('addStudent');
	},

	searchStudent: async (req, res) => {
		try {
			console.log(req.query.ID);
			const resObject = await populateStudentResObject(req.query.ID);
			res.cookie('ID', `${req.query.ID}`, { httpOnly: true });
			res.render('searchStudent', { data: resObject });
		} catch (error) {
			res.render('searchStudent');
		}
	},
	postNewStudent: async (req, res) => {
		try {
			const result = await cloudinary.uploader.upload(req.file.path);
			await Student.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				ID: req.body.idNumber,
				grade: req.body.grade,
				primaryExceptionality: req.body.primary,
				caseManager: req.user._id,
				history: [],
				accommodations: [],
				IEPDueDate: req.body.IEP,
				cloudinaryID: result.public_id,
				image: result.secure_url,
			});
			console.log('Student has been added');
			if (req.body.idNumber) {
				res.cookie('ID', `${req.body.idNumber}`, { httpOnly: true });
			}
			res.redirect('/student/addGoals');
		} catch (err) {
			console.error(err);
		}
	},
	addGoalsPage: (req, res) => {
		console.log(req.cookies);
		const ID = req.cookies['ID'];
		console.log(ID);
		res.render('addGoals', {
			ID: ID,
		});
	},
	addGoals: async (req, res) => {
		try {
			const succeed = req.body.succeed === 'on' ? true : false;
			let domain;
			switch (req.body.domain) {
				case 'curriculum':
					domain = 'Curriculum and Learning Environment';
					break;
				case 'socialEmotional':
					domain = 'Social / Emotional';
					break;
				case 'independentFunctioning':
					domain = 'Independent Functioning';
					break;
				case 'healthcare':
					domain = 'HealthCare';
					break;
				case 'communication':
					domain = 'Communication';
					break;
			}
			const goal = await Goal.create({
				grade: req.body.goalGrade,
				domain: domain,
				text: req.body.goalText,
				succeed: succeed,
				notes: req.body.notes,
			});
			const student = Student.find({
				ID: req.body.ID,
			});
			await student.updateOne({
				$push: { history: goal },
			});
		} catch (error) {
			console.error(error);
		}
		res.render('addGoals.pug', {
			ID: req.body.ID,
		});
	},
	addAccommodations: async (req, res) => {
		res.redirect('/student/addAccommodations/' + req.cookies.ID);
	},
	addAccommodationsLoaded: async (req, res) => {
		const student = await Student.find({
			ID: req.params.id,
		}).populate({
			path: 'accommodations',
		});

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
	},
	loadAccommodations: async (req, res) => {
		console.log(req.body);
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
	deleteStudent: async (req, res) => {
		try {
			console.log(req.body.ID);
			console.log(req.user.id);
			const student = await Student.deleteOne({
				ID: req.body.ID,
			});
			res.redirect('/dashboard');
		} catch (error) {
			res.redirect('/dashboard');
		}
	},
	getEditPage: async (req, res) => {
		try {
			const resObject = await populateStudentResObject(req.params.id);
			console.log(resObject._id);
			res.render('editStudent', {
				data: resObject,
			});
		} catch (error) {
			console.error(error);
		}
	},

	// .save() method for updating and targeting
	// Find
	// Manip
	// Save
	editStudent: async (req, res) => {
		try {
			const student = await Student.find({
				_id: req.body._id,
			}).populate({
				path: 'accommodations',
			});
			const caseManager = await Teacher.findOne({
				username: req.body.caseManager,
			});
			console.log(req.body);
			await Student.updateMany(
				{ ID: req.body.ID },
				{
					$set: {
						primaryExceptionality: req.body.primary,
						ID: req.body.ID,
						caseManager: caseManager,
						grade: req.body.grade,
						IEPDueDate: req.body.IEP,
					},
				}
			);
			await Student.updateOne(
				{ ID: req.body.ID },
				{
					$unset: { history: 1 },
				}
			);
			const domainCheck =
				typeof req.body.domain === 'string'
					? [req.body.domain]
					: req.body.domain;

			for (let i = 0; i < domainCheck.length; i++) {
				if (
					req.body.attained === 'on' &&
					typeof req.body.attained === 'object'
				) {
					req.body.attained = req.body.attained.splice(i + 1);
				}
				if (domainCheck.length === 1) {
					const goalObj = await Goal.create({
						student: req.body._id,
						grade: [req.body.goalGrade][i],
						domain: [req.body.domain][i],
						text: [req.body.text][i],
						succeed: [req.body.attained][i] === 'on' ? true : false,
					});
					console.log(goalObj);
					await Student.updateOne(
						{ ID: req.body.ID },
						{
							$push: { history: goalObj },
						}
					);
				} else {
					const goalObj = await Goal.create({
						student: req.body._id,
						grade: req.body.goalGrade[i],
						domain: req.body.domain[i],
						text: req.body.text[i],
						succeed: req.body.attained[i] === 'on' ? true : false,
					});
					console.log(goalObj);
					await Student.updateOne(
						{ ID: req.body.ID },
						{
							$push: { history: goalObj },
						}
					);
				}
			}
			res.redirect('/student/editStudent/' + req.body.ID);
		} catch (error) {
			console.error(error);
		}
	},
};

async function populateStudentResObject(ID) {
	console.log(`ID:${ID}`);
	try {
		// console.log(presentation);
		// console.log(Object.values(presentation));
		// console.log(Object.values(presentation).split(' ').join(','));
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
		const responseTitles = Object.keys(response);
		const presentationTitles = Object.keys(presentation);
		const settingTitles = Object.keys(setting);
		const schedulingTitles = Object.keys(scheduling);
		const resObject = {
			_id: student._id,
			name: student.firstName + ' ' + student.lastName,
			ID: student.ID,
			grade: student.grade,
			caseManager: student.caseManager.userName,
			primary: student.primaryExceptionality,
			history: returnHistory,

			presentationList: student.accommodations
				.filter((accomm) => {
					return Object.values(presentation)
						.join(',')
						.split(',')
						.includes(accomm.name);
				})
				.map((accomm) => {
					return accomm.name;
				}),
			responseList: student.accommodations
				.filter((accomm) => {
					return Object.values(response)
						.join(',')
						.split(',')
						.includes(accomm.name);
				})
				.map((accomm) => {
					return accomm.name;
				}),
			schedulingList: student.accommodations
				.filter((accomm) => {
					return Object.values(scheduling)
						.join(',')
						.split(',')
						.includes(accomm.name);
				})
				.map((accomm) => {
					return accomm.name;
				}),
			settingList: student.accommodations
				.filter((accomm) => {
					return Object.values(setting)
						.join(',')
						.split(',')
						.includes(accomm.name);
				})
				.map((accomm) => {
					return accomm.name;
				}),
			IEP: student.IEPDueDate.toDateString()
				.split(' ')
				.splice(1, 4)
				.join(' '),
			image: student.image,
		};
		return resObject;
	} catch (error) {
		console.error(error);
	}
}

const presentation = {
	'Visual Formats': [
		'Receptive Sign Language',
		'Large Print',
		'Color Contrast',
		'Video Recordings',
		'Closed Captioning/ASL Videos',
	],
	'Tactile Formats': [
		'Braille',
		'Refreshable Braille Display',
		'Nemeth Braille Code',
		'Tactile Graphic Images',
		'Brailled Equipment',
		'Haptic Feedback',
		'Real Objects',
	],

	'Auditory Formats': [
		'Verbal Presentation',
		'Recorded Books and Texts',
		'Screen Reader',
		'Equipment with Audio Output',
	],
	'Paper-Based Assessment': ['Paper-Based Assessments'],
	'Visual Formats': [
		'Magnification Equipment',
		'Reduced Glare or Direct Lighting',
		'Minimized Visual Distraction',
		'Colored Transparencies/Filters',
		'Reading Guide Card',
		'Positioning Tools',
		'Securing Materials and Workbooks',
	],
	Reading: [
		'Leveled Books',
		'Digital Text',
		'Portable Scanning Devices',
		'Personal Word Lists',
		'Repeated Reading',
	],

	Comprehension: [
		'Preview of Vocabulary or Key Points',
		'Advance Organizers',
		'Highlighting or Color Coding',
		'Annotating',
		'Study Guides',
		'Hands-on Activities, Pictures And Diagrams',
	],
	Listening: [
		'Advance Organizers',
		'Explicit Cues',
		'Active Student Involvement',
		'Repetition of Information',
		'Note-Taking Assistance',
		'Amplification Systems',
	],
	'Following Directions': [
		'Signals or Prompts',
		'Self-Instructions or Self-Questions',
		'Copy of Directions',
		'Directions Repeated or Clarified',
		'Sample Problems and Tasks',
		'Simplified Graphic Directions w/ Pictures',
		'Monitoring',
		'Verbal Encouragement',
		'Uncluttered and Clearly Organized Materials',
		'Visual Cues',
	],
};
const response = {
	'Alternate Response Methods': [
		'Scribe',
		'Word Processor',
		'Word Prediction Software',
		'Brailler',
		'Portable Note-Taking Devices',
		'Voice Recorders',
		'Voice Recognition Software',
		'Expressive Sign Language',
		'Cued Speech',
		'Augmentative and Alternative Communication',
	],
	'Supports for Handwriting': [
		'Modified Writing Utensils',
		'Pencil/Pen Grips',
		'Finger Spacers',
		'Handwriting Guides',
		'Alphabet Strips',
		'Specialized Writing Paper',
		'Visual Writing Cues',
		'Paper Stabilizers',
		'Slant Boards',
		'Physical Supports',
		'Periodic Checks By Teacher',
		'Respond Directly on Worksheet',
	],
	'Supports for Written Expression': [
		'Dictionaries and Thesauruses',
		'Strategies, Templates, and Checklists',
		'Individualized Spelling List',
		'Spelling and Grammar check',
		'Graphic Organizers and Outlining',
	],
	'Supports for Oral Expression': [
		'Increased Wait Time',
		'Use of Visual Images',
	],
	'Supports for Mathematics': [
		'Calculation Devices',
		'Tactile Tools and Materials',
		'Chart of Math Facts',
		'Concrete Materials and Manipulatives',
		'Visual Representations',
		'Specialized Mathematical Image Descriptions',
		'Planning Guides',
		'Special Paper',
	],
};

const setting = {
	'Physical Access': [
		'Accessible Workstations',
		'Preferential Seating',
		'Special Lighting',
		'Acoustical Treatments',
		'Assignments Administered by a familiar person',
	],
	'Behavior and Attention': [
		'Class Rules and Expectations',
		'Regular Procedures and Predictable Routines',
		'Alternative Activities',
		'Reduced Sources of Distractions',
		'Preferential Seating',
		'Noise buffers',
		'Small Group',
		'Individual Settings',
		'Increased/Decreased Opportunity for Movement',
	],
	Organization: [
		'Compartmentalized Containers',
		'Diagrams',
		'Checklists',
		'Color-Coded Binders',
		'Limited Materials',
		'Access To Study Materials',
	],
};
const scheduling = {
	'Time Allocation': ['Extended time', 'Breaks', 'Schedule Adjustments'],
	'Time Management': [
		'Predictable Routines',
		'Separating Tasks Into Parts',
		'Timelines',
		'Checklists of Tasks',
		'Assignment Planners',
		'Visual Schedules',
		'Electronic Devices',
	],
};
