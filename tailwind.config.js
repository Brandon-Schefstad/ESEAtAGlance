/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['views/*.pug', 'views/partials/*.pug'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#FFFFFF', // White
					secondary: '#3D7877', // Green
					accent: '#141414', // Black
					neutral: '#e4edff', //Light Gray
					'base-100': '#F3E9C1', //Tan
					info: '#F2F7F6',
					success: '#DC7945', // red
					warning: '#FBBD23', //
					error: '#D4D4D4',
					warning: '#FBBD23',
					error: '#D4D4D4',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
