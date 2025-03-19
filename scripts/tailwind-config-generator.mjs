// SPDX-FileCopyrightText: 2025 DB Systel GmbH
//
// SPDX-License-Identifier: Apache-2.0

/*
 * This script generates a tailwind.config.js file
 */

import * as process from 'node:process';
import * as fs from 'node:fs';

const defaultConfig = process.argv[2];

const internal = process.argv[3];

let configFile = `
	const tokens = require('${
		internal ? './' : '@db-ui/base/build/tailwind/'
	}tailwind-tokens.json')
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
  `;

if (defaultConfig === 'default') {
	configFile = `module.exports = require('@db-ui/base/build/tailwind/tailwind.config')`;
}

await fs.writeFileSync(
	`${internal ? './build/tailwind' : '.'}/tailwind.config.js`,
	configFile
);
