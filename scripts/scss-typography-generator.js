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
	const isHeadline = textType === 'headline';

	let result = `
${utility ? '.' : '%'}${prefix}-${scale}-${textType}-${getShortSize(size)}{
`;
	result += `
\tline-height: $${prefix}-typography-${scale}-mobile-${textType}-${size}-line-height;
\tfont-size: $${prefix}-typography-${scale}-mobile-${textType}-${size}-font-size;
`;

	if (isHeadline) {
		result += `
    &-light,
    &[data-variant="light"] {
        font-weight: 300;
    }
	`;
	}

	result += `
\t@media only screen and (min-width: $db-screens-md) {
\t\tline-height: $${prefix}-typography-${scale}-tablet-${textType}-${size}-line-height;
\t\tfont-size: $${prefix}-typography-${scale}-tablet-${textType}-${size}-font-size;
\t}\n`;

	result += `
\t@media only screen and (min-width: $db-screens-lg) {
\t\tline-height: $${prefix}-typography-${scale}-desktop-${textType}-${size}-line-height;
\t\tfont-size: $${prefix}-typography-${scale}-desktop-${textType}-${size}-font-size;
\t}
		`;

	result += `
}
	`;

	return result;
};

const generateClasses = (typography, utility) => {
	let allClasses = fileHeader;

	// ScaleTypeKey = [normal, functional, expressive]
	for (const scaleTypeKey of Object.keys(typography)) {
		const scaleObject = typography[scaleTypeKey];
		const mediaQueryKeys = Object.keys(scaleObject);
		if (mediaQueryKeys.length > 0) {
			// Desktop
			const firstMediaQueryKey = mediaQueryKeys[0];
			const firstMediaQueryObject = scaleObject[firstMediaQueryKey];
			// TextTypeKey = [headline, body]
			for (const textTypeKey of Object.keys(firstMediaQueryObject)) {
				const textTypeObject = firstMediaQueryObject[textTypeKey];
				// SizeKey = [3xlarge - 3xsmall]
				for (const sizeKey of Object.keys(textTypeObject)) {
					allClasses += getUtilityClass(
						utility,
						scaleTypeKey,
						textTypeKey,
						sizeKey
					);
				}
			}
		}
	}

	return allClasses;
};

module.exports = generateClasses;
