/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["**/*.{html,js}"],
	theme: {
		extend: {
			backgroundImage: {
				heroBg: "url('./assets/images/hero-bg.png')",
			},
		},
	},
	plugins: [],
};
