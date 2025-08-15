module.exports = {
	extends: [require.resolve('./base.cjs')],
	env: { node: true },
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
};