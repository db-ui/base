const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);

const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary');

const flattenColors = (dictionary) => {
	const colors = dictionary['color'];
	let flatColors = {};
	if (colors) {
		Object.keys(colors).forEach((colorKey) => {
			if (
				typeof colors[colorKey] === 'string' ||
				colors[colorKey] instanceof String
			) {
				flatColors[colorKey] = colors[colorKey];
			} else {
				Object.keys(colors[colorKey]).forEach((subColorKey) => {
					// TODO: We should be able to removed this with Amazon Style Dictionary 4, as this might allow parallel "nesting" of a value and subentries
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
				});
			}
		});
	}
	dictionary['color'] = flatColors;
};

StyleDictionary.registerFormat({
	name: 'tailwind',
	formatter: function ({ dictionary }) {
		const minifiedDic = minifyDictionary(dictionary.tokens);
		flattenColors(minifiedDic);
		return JSON.stringify(minifiedDic, null, 2);
	}
});

StyleDictionary.buildAllPlatforms();
