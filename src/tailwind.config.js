/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
	darkMode: 'class', // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				// Ensure proper color definitions for dark mode
			}
		},
	},
	plugins: [],
}