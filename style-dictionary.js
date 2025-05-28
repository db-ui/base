// SPDX-FileCopyrightText: 2025 DB Systel GmbH
//
// SPDX-License-Identifier: Apache-2.0

/* eslint unicorn/prefer-module: 0 */
const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);
const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary');

const flattenColors = (dictionary) => {
	const colors = dictionary.color;
	const flatColors = {};
	if (colors) {
		for (const colorKey of Object.keys(colors)) {
			if (
				typeof colors[colorKey] === 'string' ||
				// eslint-disable-next-line unicorn/no-instanceof-builtins
				colors[colorKey] instanceof String
			) {
				flatColors[colorKey] = colors[colorKey];
			} else {
				for (const subColorKey of Object.keys(colors[colorKey])) {
					/* eslint no-warning-comments: 0 */
					// TODO: We should be able to remove this with Amazon Style Dictionary 4, as this might allow parallel "nesting" of a value and subentries
					if (subColorKey === '_') {
						flatColors[`${colorKey}`] =
							colors[colorKey][subColorKey];
					} else if (subColorKey.includes('small')) {
						flatColors[`${colorKey}-sm`] =
							colors[colorKey][subColorKey];
					} else {
						flatColors[`${colorKey}-${subColorKey}`] =
							colors[colorKey][subColorKey];
					}
				}
			}
		}
	}

	dictionary.color = flatColors;
};

StyleDictionary.registerFormat({
	name: 'tailwind',
	/* eslint object-shorthand: 0, prettier/prettier: 0 */
	formatter: function ({ dictionary }) {
		const minifiedDic = minifyDictionary(dictionary.tokens);
		flattenColors(minifiedDic);
		return JSON.stringify(minifiedDic, null, 2);
	}
});

StyleDictionary.buildAllPlatforms();
