const Student = require('../models/Student');
const cloudinary = require('../middleware/cloudinary');
const Accommodations = require('../models/Accommodations.js');
const Goal = require('../models/Goals.js');
const dashboard = require('./dashboard.js');

module.exports = {
	addNewStudent: (req, res) => {
		res.render('addStudent');
	},

	searchStudent: async (req, res) => {
		try {
			let student = await Student.findOne({
				ID: req.query.ID,
			})
				.populate({
					path: 'history',
				})
				.populate({
					path: 'caseManager',
				})
				.populate({
					path: 'accommodations',
				})
				.lean();
			let history = [[], [], [], [], [], [], [], [], [], [], [], [], []];
			console.log(student);
			student.history.forEach((goal) => {
				history[parseInt(goal.grade)].push(goal);
			});
			let returnHistory = history.filter((subArr) => {
				return subArr.length > 0;
			});
			let presentation = student.accommodations.filter((accomm) => {
				return accomm.category === 'presentation';
			});
			let response = student.accommodations.filter((accomm) => {
				return accomm.category === 'response';
			});
			let setting = student.accommodations.filter((accomm) => {
				return accomm.category === 'setting';
			});
			let scheduling = student.accommodations.filter((accomm) => {
				return accomm.category === 'scheduling';
			});
			const resObject = {
				name: student.firstName + ' ' + student.lastName,
				ID: student.ID,
				grade: student.grade,
				caseManager: student.caseManager.userName,
				primary: student.primaryExceptionality,
				history: returnHistory,
				presentation: presentation,
				response: response,
				setting: setting,
				scheduling: scheduling,
				IEP: student.IEPDueDate.toDateString()
					.split(' ')
					.splice(1, 4)
					.join(' '),
				image: student.image,
			};
			console.log(resObject);
			res.render('searchStudent', { data: resObject });
		} catch (error) {
			res.render('searchStudent');
		}
	},

	// searchGoals: async (req, res) => {
	// 	const student = await Student.findOne({
	// 		ID: req.params.ID,
	// 	});
	// 	res.redirect('/student/searchStudent');
	// },
	postNewStudent: async (req, res) => {
		try {
			console.log(req.query);
			const result = await cloudinary.uploader.upload(req.file.path);
			console.log(result);
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
			res.cookie('ID', `${req.body.idNumber}`, { httpOnly: true });
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
		//  Add dynamic page for add/delete accoms?
		res.render('addAccommodations');
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
			});
			console.log(req.body);
			// Make array of Accommodation names, sans ID
			let accommodationArray = Object.keys(req.body).filter((element) => {
				return element !== 'ID';
			});
			// Array to push to DB
			let accommodationPushArray = [];
			for (let i = 0; i < accommodationArray.length; i++) {
				let accommodation = await Accommodations.findOne({
					name: accommodationArray[i],
				});
				if (!accommodation) {
					const currentAccomm = accommodationArray[i];
					let category = '';
					if (presentation.includes(currentAccomm)) {
						category = 'presentation';
					} else if (response.includes(currentAccomm)) {
						category = 'response';
					} else if (setting.includes(currentAccomm)) {
						category = 'setting';
					} else if (scheduling.includes(currentAccomm)) {
						category = 'scheduling';
					}
					console.log(category);
					const returnAccomm = await Accommodations.create({
						student: student._id,
						name: accommodationArray[i],
						dateAdded: Date.now(),
						category: category,
					});
					console.log(returnAccomm);
					accommodationPushArray.push(returnAccomm);
				} else if (
					!student.accommodations.includes(accommodation._id)
				) {
					accommodationPushArray.push(accommodation._id);
				}
			}
			await student.updateOne({
				$push: { accommodations: accommodationPushArray },
			});
			res.render('addAccommodations');
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
};

const presentation = [
	'Receptive Sign Language',
	'Large Print',
	'Color Contrast',
	'Video Recordings',
	'Closed Captioning/ASL Videos',
	'Tactile Formats',
	'Braille',
	'Refreshable Braille Display',
	'Nemeth Braille Code',
	'Tactile Graphic Images',
	'Brailled Equipment',
	'Haptic Feedback',
	'Real Objects',
	'Auditory Formats',
	'Verbal Presentation',
	'Recorded Books and Texts',
	'Screen Reader',
	'Equipment with Audio Output',
	'Paper-Based Assessment',
	'Paper-Based Assessments',
	'Visual Enhancement',
	'Magnification Equipment',
	'Reduced Glare or Direct Lighting',
	'Minimized Visual Distraction',
	'Colored Transparencies/Filters',
	'Reading Guide Card',
	'Positioning Tools',
	'Securing Materials and Workbooks',
	'Visual Enhancement',
	'Leveled Books',
	'Digital Text',
	'Portable Scanning Devices',
	'Personal Word Lists',
	'Repeated Reading',
	'Comprehension',
	'Preview of Vocabulary or Key Points',
	'Advance Organizers',
	'Highlighting or Color Coding',
	'Annotating',
	'Study Guides',
	'Hands-on Activities, Pictures And Diagrams',
	'Listening',
	'Advance Organizers',
	'Explicit Cues',
	'Active Student Involvement',
	'Repetition of Information',
	'Note-Taking Assistance',
	'Amplification Systems',
	'Following Directions',
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
];
const response = [
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
	'Supports for Handwriting',
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
	'Supports for Written Expression',
	'Dictionaries and Thesauruses',
	'Strategies, Templates, Checklists, and Grammar Rules',
	'Individualized Spelling List',
	'Spelling and Grammar check',
	'Graphic Organizers and Outlining',
	'Supports for Oral Expression',
	'Increased Wait Time',
	'Use of Visual Images',
	'Supports for Mathematics',
	'Calculation Devices',
	'Tactile Tools and Materials',
	'Chart of Math Facts',
	'Concrete Materials and Manipulatives',
	'Visual Representations',
	'Specialized Mathematical Image Descriptions',
	'Planning Guides',
	'Special Paper',
];

const setting = [
	'Physical Access',
	'Accessible Workstations',
	'Preferential Seating',
	'Special Lighting',
	'Acoustical Treatments',
	'Assignments and Assessments Administered by a familiar person',
	'Behavior and Attention',
	'Class Rules and Expectations',
	'Regular Procedures and Predictable Routines',
	'Alternative Activities',
	'Reduced Sources of Distractions',
	'Preferential Seating',
	'Noise buffers',
	'Small Group',
	'Individual Settings',
	'Increased/Decreased Opportunity for Movement',
	'Behavior and Attention',
	'Compartmentalized Containers',
	'Diagrams',
	'Checklists',
	'Color-Coded Binders',
	'Limited Materials',
	'Access To Study Materials',
];
const scheduling = [
	'Time Allocation',
	'Extended time',
	'Breaks',
	'Schedule Adjustments',
	'Time Management',
	'Predictable Routines',
	'Separating Tasks Into Parts',
	'Timelines',
	'Checklists of Tasks',
	'Assignment Planners',
	'Visual Schedules',
	'Electronic Devices',
];
