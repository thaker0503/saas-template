module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	roots: ['<rootDir>'],
	moduleNameMapper: {
		'^@acme/rbac$': '<rootDir>/../../packages/rbac/src/index.ts',
		'^@acme/tenancy$': '<rootDir>/../../packages/tenancy/src/index.ts',
		'^@acme/feature-flags$': '<rootDir>/../../packages/feature-flags/src/index.ts',
		'^@acme/env$': '<rootDir>/../../packages/env/src/index.ts',
	},
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
};