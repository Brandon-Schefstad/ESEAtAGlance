const Student = require('../../models/Student');
const Accommodations = require('../../models/Accommodations');
// const {
// 	presentation,
// 	scheduling,
// 	response,
// 	setting,
// } = require('./accommodations.js');

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
			IEP: student.IEPDueDate.toDateString().split(' ').splice(1, 4).join(' '),
			image: student.image,
		};
		return resObject;
	} catch (error) {
		console.error(error);
	}
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
