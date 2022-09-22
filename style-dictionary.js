const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);

const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary');

const modifyTailwind = (dictionary) => {
	const colors = JSON.stringify(dictionary['colors']).replace(
		/enabled/g,
		'DEFAULT'
	);
	dictionary['colors'] = JSON.parse(colors);
	const spacings = JSON.stringify(dictionary['spacing']).replace(
		/spacing-/g,
		''
	);
	dictionary['spacing'] = JSON.parse(spacings);
	delete dictionary['typography'];
};

StyleDictionary.registerFormat({
	name: 'tailwind',
	formatter: function ({ dictionary }) {
		const minifiedDic = minifyDictionary(dictionary.tokens);
		modifyTailwind(minifiedDic);
		return JSON.stringify(minifiedDic, null, 2);
	}
});

StyleDictionary.buildAllPlatforms();
