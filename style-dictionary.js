const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);

const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary');
const SCSSPlaceholders = require('./scripts/color-placeholders-generator');
const SCSSClasses = require('./scripts/color-classes-generator');
const transforms = require('style-dictionary/lib/common/transforms');

const GenerateClasses = require('./scripts/scss-typography-generator');

const modifyTailwind = (dictionary) => {
	const colors = JSON.stringify(dictionary['colors']).replace(
		/enabled/g,
		'DEFAULT'
	);
	dictionary['colors'] = JSON.parse(colors);
	delete dictionary['typography'];
};

StyleDictionary.registerFormat({
	name: 'tailwind',
	formatter: ({ dictionary }) => {
		const minifiedDic = minifyDictionary(dictionary.tokens);
		modifyTailwind(minifiedDic);
		return JSON.stringify(minifiedDic, null, 2);
	}
});

StyleDictionary.registerFormat({
	name: 'db-core-typography-classes',
	formatter: function ({ dictionary }) {
		const typography = dictionary.tokens.typography;
		return GenerateClasses(typography, true);
	}
});

StyleDictionary.registerFormat({
	name: 'db-core-typography-placeholder',
	formatter: function ({ dictionary }) {
		const typography = dictionary.tokens.typography;
		return GenerateClasses(typography, false);
	}
});

StyleDictionary.registerFormat({
	name: 'db-core-color-placeholder',
	formatter: function ({ dictionary }) {
		const colors = dictionary.tokens.colors;
		return SCSSPlaceholders.generateColorUtilitityPlaceholder(colors);
	}
});

StyleDictionary.registerFormat({
	name: 'db-core-color-classes',
	formatter: function ({ dictionary }) {
		const colors = dictionary.tokens.colors;
		return SCSSClasses.generateColorUtilitityClasses(colors);
	}
});

const getPathTransform = (orgTransform, token, options) => {
	return transforms[orgTransform].transformer(
		{
			...token,
			path: token.path.map((p) => p.replace('.', 'p'))
		},
		options
	);
};

StyleDictionary.registerTransform({
	type: `name`,
	name: `name/dotty/pascal`,
	transformer: (token, options) => {
		return getPathTransform('name/cti/pascal', token, options);
	}
});

StyleDictionary.registerTransform({
	type: `name`,
	name: `name/dotty/camel`,
	transformer: (token, options) => {
		return getPathTransform('name/cti/camel', token, options);
	}
});

StyleDictionary.registerTransformGroup({
	name: 'JSDotty',
	transforms: ['attribute/cti', 'name/dotty/pascal', 'size/px', 'color/hex']
});

StyleDictionary.registerTransformGroup({
	name: 'JS',
	transforms: ['attribute/cti', 'name/dotty/pascal', 'size/px', 'color/hex']
});

StyleDictionary.registerTransformGroup({
	name: 'CSS',
	transforms: [
		'attribute/cti',
		'name/cti/kebab',
		'time/seconds',
		'content/icon',
		'size/px',
		'color/css'
	]
});

StyleDictionary.registerTransformGroup({
	name: 'SCSS',
	transforms: [
		'attribute/cti',
		'name/cti/kebab',
		'time/seconds',
		'content/icon',
		'size/px',
		'color/css'
	]
});

StyleDictionary.registerTransformGroup({
	name: 'Swift',
	transforms: [
		'attribute/cti',
		'name/dotty/camel',
		'color/UIColorSwift',
		'content/swift/literal',
		'asset/swift/literal',
		'size/swift/remToCGFloat',
		'font/swift/literal'
	]
});

StyleDictionary.registerTransformGroup({
	name: 'Flutter',
	transforms: [
		'attribute/cti',
		'name/dotty/camel',
		'color/hex8flutter',
		'size/flutter/remToDouble',
		'content/flutter/literal',
		'asset/flutter/literal',
		'font/flutter/literal'
	]
});

StyleDictionary.buildAllPlatforms();
