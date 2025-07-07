/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jest-environment-jsdom',
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: './tsconfig.jest.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.module\\.css$': 'identity-obj-proxy',
		'\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
