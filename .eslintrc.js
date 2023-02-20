module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'eslint-config-prettier',
		'prettier',
	],
	globals: {
		React: true,
		JSX: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'no-unused-vars': 'warn',
		'react/react-in-jsx-scope': 'off',
		camelcase: 'off',
		'spaced-comment': 'error',
		quotes: ['error', 'single'],
		'no-duplicate-imports': 'error',
		'react/jsx-props-no-spreading': 0,
		'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
		'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
		'import/prefer-default-export': 'off',
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'react/button-has-type': 'off',
		'consistent-return': 'off',
		'react/display-name': 'off',
	},
}
