require('dotenv').config();
const { ZeplinApi, Configuration } = require('@zeplin/sdk');
const FS = require('fs');

const zeplin = new ZeplinApi(
	new Configuration({
		accessToken: process.env.DEVELOPER_ZEPLIN_ACCESS_TOKEN
	})
);

(async () => {
	try {
		const { data } = await zeplin.designTokens.getStyleguideDesignTokens(
			'63037ab49bdcb913c9228718'
		);

		const textStyleKeys = Object.keys(data.textStyles);
		textStyleKeys.forEach((key) => {
			const textStyle = data.textStyles[key];
			data.textStyles[key] = {
				...textStyle.value,
				// I guess we don't need this color here
				color: {
					value: textStyle.value.color.replace('$colors', 'colors')
				}
			};
		});

		FS.writeFileSync('./tokens/zeplin.json', JSON.stringify(data));
	} catch (e) {
		console.error(e);
	}
})();
