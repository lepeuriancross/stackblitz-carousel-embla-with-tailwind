/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0da34e',
					dark: '#0c8c47',
				},
			},
		},
	},
	plugins: [],
};