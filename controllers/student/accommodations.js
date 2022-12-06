const Student = require('../../models/Student');
const Accommodations = require('../../models/Accommodations');

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
const presentation = {
	'Visual Formats': [
		'Sign Language Interpreter',
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
	'Visual Enhancement': [
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
