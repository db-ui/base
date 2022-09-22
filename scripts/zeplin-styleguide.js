require('dotenv').config();
const { ZeplinApi, Configuration } = require('@zeplin/sdk');
const FS = require('fs');

const zeplin = new ZeplinApi(
	new Configuration({
		accessToken: process.env.DEVELOPER_ZEPLIN_ACCESS_TOKEN
	})
);

const correctKey = (key) => {
	let correctKey = key;
	for (let i = 0; i < 20; i++) {
		const replacementNumber = String(i).padStart(2, '0');
		while (correctKey.includes(replacementNumber)) {
			correctKey = correctKey.replace(`${replacementNumber}-`, '');
		}
	}
	return correctKey;
};

const correctColor = (key) => {
	let correctKey = key;
	if (correctKey.startsWith('on') && !correctKey.startsWith('on-')) {
		correctKey = correctKey.replace('on', 'on-');
	}
	if (
		!correctKey.endsWith('-enabled') &&
		!correctKey.endsWith('-hover') &&
		!correctKey.endsWith('-pressed')
	) {
		correctKey = `${correctKey}-enabled`;
	}
	return correctKey.replace('backgroundonly', 'bg');
};

const combineDataRecursive = (data, currentKey, keyArray, value) => {
	const nextKey = keyArray.shift();
	if (keyArray.length === 0) {
		return { [nextKey]: value };
	}
	data[currentKey] = {
		...data[currentKey],
		[nextKey]: combineDataRecursive(
			data[currentKey],
			nextKey,
			keyArray,
			value
		)
	};
};

const mergeData = (data) => {
	const mData = {};
	Object.keys(data).forEach((key) => {
		const splitKeys = key.split('-');
		if (splitKeys.length > 1 && splitKeys[0] === 'on') {
			const dataKey = splitKeys[1];
			splitKeys[0] = dataKey;
			splitKeys[1] = 'on';
		}
		let tmpData = mData;
		splitKeys.forEach((sKey, index) => {
			if (index === splitKeys.length - 1) {
				tmpData[sKey] = data[key];
			} else {
				if (!tmpData[sKey]) {
					tmpData[sKey] = {};
				}
				tmpData = tmpData[sKey];
			}
		});
	});
	return mData;
};

const getWoffs = (key, fontFamily) => {
	let font = 'dbscreensans-regular';
	if (key.includes('bold')) {
		font = 'dbscreensans-bold';
	} else if (fontFamily === 'DBScreenHead') {
		font = 'dbscreenhead-light';
	}

	return {
		woff: {
			value: `'assets/fonts/${font}.woff'`
		},
		woff2: {
			value: `'assets/fonts/${font}.woff2'`
		}
	};
};

const convertColors = (data) => {
	const keys = Object.keys(data.colors);
	const newColors = {};
	keys.forEach((key) => {
		const color = data.colors[key];
		// TODO: Merge Similar Keys together
		newColors[correctColor(correctKey(key))] = { value: color.value };
	});
	data.colors = mergeData(newColors);
};

const tShirtSizes = [
	'extralarge',
	'large',
	'medium',
	'small',
	'xsmall',
	'xxsmall',
	'bold'
];
const alignments = ['left', 'center', 'right'];

const shortenTypographyRecursive = (data) => {
	if (data instanceof Object) {
		const result = {};
		try {
			const dataKeys = Object.keys(data);
			dataKeys.forEach((topLvlKey) => {
				const topLvlData = data[topLvlKey];
				if (!topLvlData) {
					return { [topLvlKey]: { value: 'error' } };
				}
				const secondLvKeys = Object.keys(topLvlData);
				if (
					secondLvKeys.length > 0 &&
					secondLvKeys.find(
						(sKey) => sKey === 'value' || alignments.includes(sKey)
					)
				) {
					const foundValue =
						secondLvKeys[0] === 'value'
							? topLvlData['value']
							: topLvlData[secondLvKeys[0]]['value'];
					if (!foundValue) {
						return { [topLvlKey]: { value: 'error' } };
					}

					result[topLvlKey] = {
						lineHeight: { value: foundValue.lineHeight },
						fontFamily: {
							value: foundValue.font.family.includes('Head')
								? '{font.family.headline.value}'
								: '{font.family.base.value}'
						},
						fontSize: { value: foundValue.font.size },
						fontWeight: { value: foundValue.font.weight },
						...getWoffs(topLvlKey, foundValue.font.family)
					};
				} else {
					result[topLvlKey] = shortenTypographyRecursive(topLvlData);
				}
			});
		} catch (e) {
			console.error(e);
			console.log(data);
		}
		return result;
	}
	return { value: 'error' };
};

const convertTextStyles = (data) => {
	const keys = Object.keys(data.textStyles);

	const newTextStyles = {};
	keys.filter((key) => {
		// some issue of old data?
		return key !== '-db-';
	}).forEach((key) => {
		const textStyle = data.textStyles[key];
		delete textStyle.value.color;
		const cKey = correctKey(key)
			.replace('foundation-', '')
			.replace('typography-', '')
			.replace('autowidth-', '')
			.replace('autoheight-', '')
			.replace('link-link-', 'link-')
			.replace('button-button-', 'button-')
			.replace('large-bold', 'bold-large');
		if (!cKey.startsWith('headline')) {
			// Skip headline for now until it is fixed
			newTextStyles[cKey] = { value: textStyle.value };
		}
	});
	data.textStyles = shortenTypographyRecursive(mergeData(newTextStyles));
	data.textStyles['alignment'] = {
		center: { value: 'center' },
		left: { value: 'left' },
		right: { value: 'right' }
	};
};

const convertSpacings = (data) => {
	const keys = Object.keys(data.spacing);
	const newSpacings = {};
	keys.forEach((key) => {
		const spacing = data.spacing[key];
		const cKey =
			key.split('-').length === 3 ? key.replace('-5', '.5') : key;
		newSpacings[cKey] = {
			value: `${spacing.value}px`
		};
	});
	data.spacing = newSpacings;
};

(async () => {
	try {
		const { data } = await zeplin.designTokens.getStyleguideDesignTokens(
			'63037ab49bdcb913c9228718'
		);
		convertColors(data);
		convertTextStyles(data);
		convertSpacings(data);

		FS.writeFileSync(
			'./tokens/zeplin.json',
			JSON.stringify({
				typography: data.textStyles,
				spacing: data.spacing,
				colors: data.colors
			})
		);
	} catch (e) {
		console.error(e);
	}
})();
