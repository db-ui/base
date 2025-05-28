// SPDX-FileCopyrightText: 2025 DB Systel GmbH
//
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line unicorn/prefer-module
const { defineConfig, globalIgnores } = require('eslint/config');
// eslint-disable-next-line unicorn/prefer-module
const globals = require('globals');

// eslint-disable-next-line unicorn/prefer-module
module.exports = defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	globalIgnores(['**/build', '**/public', '**/out'])
]);
