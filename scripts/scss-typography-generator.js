const prefix = 'db';

const fileHeader =
	'\n' +
	'// Do not edit directly\n' +
	'// Generated on ' +
	new Date().toString() +
	'\n';

const getShortSize = (size) => {
	if (size === '3xlarge') {
		return '3xl';
	}
	if (size === '2xlarge') {
		return '2xl';
	}
	if (size === 'xlarge') {
		return 'xl';
	}
	if (size === 'large') {
		return 'lg';
	}
	if (size === 'medium') {
		return 'md';
	}
	if (size === 'small') {
		return 'sm';
	}
	if (size === 'xsmall') {
		return 'xs';
	}
	if (size === '2xsmall') {
		return '2xs';
	}
	if (size === '3xsmall') {
		return '3xs';
	}

	return size;
};

const getUtilityClass = (utility, scale, textType, size) => {
	const factor = textType === 'body' ? 'regular' : 'light';

	let result = `
${utility ? '.' : '%'}${prefix}-${scale}-${textType}-${getShortSize(size)}{
`;
	//$db-typography-normal-desktop-headline-3xlarge-black-line-height: 120px;
	result += `
\tline-height: $${prefix}-typography-${scale}-mobile-${textType}-${size}-${factor}-line-height;
\tfont-size: $${prefix}-typography-${scale}-mobile-${textType}-${size}-${factor}-font-size;
\tfont-weight: $${prefix}-typography-${scale}-mobile-${textType}-${size}-${factor}-font-weight;
`;

	result += `
\t@media only screen and (min-width: $db-screens-md) {
\t\tline-height: $${prefix}-typography-${scale}-tablet-${textType}-${size}-${factor}-line-height;
\t\tfont-size: $${prefix}-typography-${scale}-tablet-${textType}-${size}-${factor}-font-size;
\t\tfont-weight: $${prefix}-typography-${scale}-tablet-${textType}-${size}-${factor}-font-weight;
\t}\n`;

	result += `
\t@media only screen and (min-width: $db-screens-lg) {
\t\tline-height: $${prefix}-typography-${scale}-desktop-${textType}-${size}-${factor}-line-height;
\t\tfont-size: $${prefix}-typography-${scale}-desktop-${textType}-${size}-${factor}-font-size;
\t\tfont-weight: $${prefix}-typography-${scale}-desktop-${textType}-${size}-${factor}-font-weight;
\t}
		`;

	result += `
}
	`;

	return result;
};

const generateClasses = (typography, utility) => {
	let allClasses = fileHeader;

	// scaleTypeKey = [normal, functional, expressive]
	Object.keys(typography).forEach((scaleTypeKey) => {
		const scaleObject = typography[scaleTypeKey];
		const mediaQueryKeys = Object.keys(scaleObject);
		if (mediaQueryKeys.length > 0) {
			// desktop
			const firstMediaQueryKey = mediaQueryKeys[0];
			const firstMediaQueryObject = scaleObject[firstMediaQueryKey];
			// textTypeKey = [headline, body]
			Object.keys(firstMediaQueryObject).forEach((textTypeKey) => {
				const textTypeObject = firstMediaQueryObject[textTypeKey];
				// sizeKey = [3xlarge - 3xsmall]
				Object.keys(textTypeObject).forEach((sizeKey) => {
					allClasses += getUtilityClass(
						utility,
						scaleTypeKey,
						textTypeKey,
						sizeKey
					);
				});
			});
		}
	});

	return allClasses;
};

module.exports = generateClasses;
