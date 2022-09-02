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

const convertColors = (data) => {
	const keys = Object.keys(data.colors);
	const newColors = {};
	keys.forEach((key) => {
		const color = data.colors[key];
		// TODO: Merge Similar Keys together
		newColors[correctKey(key)] = { value: color.value };
	});
	data.colors = newColors;
};

const convertTextStyles = (data) => {
	const keys = Object.keys(data.textStyles);

	const newTextStyles = {};
	keys.forEach((key) => {
		const textStyle = data.textStyles[key];
		delete textStyle.value.color;
		// TODO: Merge Similar Keys together
		const cKey = correctKey(key).replace('foundation-', '');
		newTextStyles[cKey] = { value: textStyle.value };
		if (cKey.includes('bold')) {
			newTextStyles[cKey].woff = {
				value: 'assets/fonts/dbscreensans-bold.woff'
			};
			newTextStyles[cKey].woff2 = {
				value: 'assets/fonts/dbscreensans-bold.woff2'
			};
		} else if (textStyle.value.font.family === 'DBScreenHead') {
			newTextStyles[cKey].woff = {
				value: 'assets/fonts/dbscreenhead-light.woff'
			};
			newTextStyles[cKey].woff2 = {
				value: 'assets/fonts/dbscreenhead-light.woff2'
			};
		} else {
			newTextStyles[cKey].woff = {
				value: 'assets/fonts/dbscreensans-regular.woff'
			};
			newTextStyles[cKey].woff2 = {
				value: 'assets/fonts/dbscreensans-regular.woff2'
			};
		}
	});
	data.textStyles = newTextStyles;
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

		FS.writeFileSync('./tokens/zeplin.json', JSON.stringify(data));
	} catch (e) {
		console.error(e);
	}
})();
