require('dotenv').config();
const FS = require('fs');
const { ZeplinApi, Configuration } = require('@zeplin/sdk');

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

const mergeData = (data) => {
	const mData = {};
	for (const key of Object.keys(data)) {
		const splitKeys = key.split('-');
		if (splitKeys.length > 1 && splitKeys[0] === 'on') {
			splitKeys[0] = splitKeys[1];
			splitKeys[1] = 'on';
		}

		let temporaryData = mData;
		for (const [index, sKey] of splitKeys.entries()) {
			if (index === splitKeys.length - 1) {
				temporaryData[sKey] = data[key];
			} else {
				if (!temporaryData[sKey]) {
					temporaryData[sKey] = {};
				}

				temporaryData = temporaryData[sKey];
			}
		}
	}

	return mData;
};

const convertColors = (data) => {
	const keys = Object.keys(data.colors);
	const newColors = {};
	for (const key of keys) {
		const color = data.colors[key];
		newColors[correctColor(correctKey(key))] = {
			value: color.value,
			attributes: {
				category: 'color'
			}
		};
	}

	data.colors = mergeData(newColors);
};

const alignments = new Set(['left', 'center', 'right']);

const shortenTypographyRecursive = (data) => {
	if (data instanceof Object) {
		const result = {};
		try {
			const dataKeys = Object.keys(data);
			for (const topLvlKey of dataKeys) {
				const topLvlData = data[topLvlKey];
				if (!topLvlData) {
					continue;
				}

				const secondLvKeys = Object.keys(topLvlData);
				if (
					secondLvKeys.some(
						(sKey) => sKey.includes('value') || alignments.has(sKey)
					)
				) {
					const foundValue =
						secondLvKeys[0] === 'value'
							? topLvlData.value
							: topLvlData[secondLvKeys[0]].value;
					if (!foundValue) {
						continue;
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
						},
						fontWeight: { value: foundValue.font.weight }
					};
				} else {
					result[topLvlKey] = shortenTypographyRecursive(topLvlData);
				}
			}
		} catch (error) {
			console.error(error);
			console.log(data);
		}

		return result;
	}

	return { value: 'error' };
};

const convertTextStyles = (data) => {
	const keys = Object.keys(data.textStyles);
	const newTextStyles = {};
	for (const key of keys.filter((key) => {
		// Some issue of old data?
		return !key.startsWith('db-');
	})) {
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
		newTextStyles[cKey] = { value: textStyle.value };
	}

	data.textStyles = shortenTypographyRecursive(mergeData(newTextStyles));
};

const convertSpacings = (data) => {
	const keys = Object.keys(data.spacing);
	const spacings = {};
	const sizes = {};
	for (const key of keys) {
		const spacing = data.spacing[key];
		if (key?.includes('sizing')) {
			console.log(key);
			sizes[key.replace('sizing-', '')] = {
				value: `${spacing.value}px`
			};
		} else {
			spacings[key.replace('spacing-', '')] = {
				value: `${spacing.value}px`
			};
		}
	}

	data.sizing = mergeData(sizes);
	data.spacing = mergeData(spacings);
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
				spacing: data.spacing,
				sizing: data.sizing,
				typography: data.textStyles,
				colors: data.colors
			})
		);
	} catch (error) {
		console.error(error);
	}
})();
