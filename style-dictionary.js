const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);

const TinyColor2 = require('tinycolor2');

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

/**
 * Custom Tailwind Formatter
 */
StyleDictionary.registerFormat({
	name: 'tailwind',
	formatter: function ({ dictionary, platform, options, file }) {
		const minifiedDic = minifyDictionary(dictionary.tokens);
		flattenColors(minifiedDic);
		return JSON.stringify(minifiedDic, null, 2);
	}
});

/**
 * Custom Sketch Palette Transform
 */
StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'color/sketchTransform',
	// matcher: (prop) => prop.attributes.category === 'color',
	transformer: (prop) => {
		let color = TinyColor2(prop.original.value).toRgb();
		console.log('--- transformer current token: ', color);
		return {
			red: color.r / 255, // .toFixed(2)
			green: color.g / 255,
			blue: color.b / 255,
			alpha: color.a
		};
	}
});

/**
 * Custom Sketch Palette Formatter
 */
StyleDictionary.registerFormat({
	name: 'sketch/sketchpalette',
	formatter: ({ dictionary, platform, options, file }) => {
		//console.log('sketch formatter ', dictionary);

		var to_ret = {
			compatibleVersion: '2.0',
			pluginVersion: '2.22',
			colors: dictionary.allProperties.map(function (prop) {
				// Merging the token's value, which should be an object with r,g,b,a channels
				return Object.assign(
					{
						name: prop.name
					},
					prop.value
				);
			})
		};
		return JSON.stringify(to_ret, null, 2);
	}
});

StyleDictionary.buildAllPlatforms();
