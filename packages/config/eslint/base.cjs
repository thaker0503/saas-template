module.exports = {
	root: false,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unused-imports'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		// Relax rules in packages without TS program
		'@typescript-eslint/no-misused-promises': 'off',
		'@typescript-eslint/no-floating-promises': 'off',

		'unused-imports/no-unused-imports': 'error',
	},
};