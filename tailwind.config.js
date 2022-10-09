/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['views/*.pug', 'views/partials/*.pug'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3b2461',

					secondary: '#ffc14d',

					accent: '#60a5fa',

					neutral: '#e4edff',

					'base-100': '#d1d5db',

					info: '#2A303C',

					success: '#4d8bff',

					warning: '#FBBD23',

					error: '#F87272',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
