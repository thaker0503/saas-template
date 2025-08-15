module.exports = {
	eslint: {
		base: require.resolve('../eslint/base.cjs'),
		next: require.resolve('../eslint/next.cjs'),
		nest: require.resolve('../eslint/nest.cjs'),
	},
	tsconfig: {
		base: require.resolve('../tsconfig/tsconfig.base.json'),
		next: require.resolve('../tsconfig/tsconfig.next.json'),
	},
	prettier: require.resolve('../prettier/index.json'),
};