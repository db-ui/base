
	const tokens = require('./tailwind-tokens.json')
	module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
			screens: tokens.screens,
			spacing: tokens.spacing,
			fontFamily: tokens.font.family,
			fontSize: tokens.fontSize,
			colors: tokens.color,
			gap: ({ theme }) => ({
				...theme('spacing'),
				...tokens.gap
			}),
			space: ({ theme }) => ({
				...theme('spacing'),
				...tokens.space
			})
  	}
  };
  