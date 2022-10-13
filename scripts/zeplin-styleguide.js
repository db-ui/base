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
	return correctKey.replace('background', 'bg');
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
			splitKeys[0] = splitKeys[1];
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

const convertColors = (data) => {
	const keys = Object.keys(data.colors);
	const newColors = {};
	keys.forEach((key) => {
		const color = data.colors[key];
		newColors[correctColor(correctKey(key))] = {
			value: color.value,
			attributes: {
				category: 'color'
			}
		};
	});
	data.colors = mergeData(newColors);
};

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
						lineHeight: {
							value: foundValue.lineHeight,
							attributes: {
								category: 'size'
							}
						},
						fontSize: {
							value: `${foundValue.font.size}`,
							attributes: {
								category: 'size'
							}
						}
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
		return (
			key.includes('token') &&
			// We don't need bold and light
			!key.includes('bold') &&
			!key.includes('light')
		);
	}).forEach((key) => {
		const textStyle = data.textStyles[key];
		delete textStyle.value.color;
		const cKey = correctKey(key)
			.replace('foundation-', '')
			.replace('typography-', '')
			.replace('token-', '')
			.replace('regular-', '')
			.replace('black-', '');
		newTextStyles[cKey] = { value: textStyle.value };
	});
	data.textStyles = shortenTypographyRecursive(mergeData(newTextStyles));
};

const convertSpacings = (data) => {
	const keys = Object.keys(data.spacing);
	const newSpacings = {};
	keys.forEach((key) => {
		const spacing = data.spacing[key];
		const containsDot = key.split('-').length === 3;
		let cKey = containsDot ? key.replace('-5', '.5') : key;
		cKey = cKey.replace('spacing-', '');
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
