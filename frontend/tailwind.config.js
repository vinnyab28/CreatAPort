const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			
		},
	},
	plugins: [],
	corePlugins: {
    preflight: false,
  },
};
