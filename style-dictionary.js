const StyleDictionary = require('style-dictionary').extend(
	'style-dictionary.config.json'
);

const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary');

const transforms = require('style-dictionary/lib/common/transforms');

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
	name: 'JS',
	transforms: ['attribute/cti', 'name/dotty/pascal', 'size/rem', 'color/hex']
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
