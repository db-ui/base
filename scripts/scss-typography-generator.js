const prefix = 'db';

const fileHeader =
	'\n' +
	'// Do not edit directly\n' +
	'// Generated on ' +
	new Date().toString() +
	'\n';

const getShortSize = (size) => {
	if (size === 'extralarge') {
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
	if (size === 'xxsmall') {
		return '2xs';
	}

	return size;
};

const getUtilityClass = (
	utility,
	screens,
	typoType,
	size,
	missingMediaQuery
) => {
	let result = `
${utility ? '.' : '%'}${prefix}-text-${typoType}-${getShortSize(size)}{
`;
	if (!missingMediaQuery) {
		result += `
\tline-height: $${prefix}-typography-${typoType}-${size}-mobile-line-height;
\tfont-size: $${prefix}-typography-${typoType}-${size}-mobile-font-size;
\tfont-weight: $${prefix}-typography-${typoType}-${size}-mobile-font-weight;
`;

		result += `
\t@media only screen and (min-width: ${screens.md.value}) {
\t\tline-height: $${prefix}-typography-${typoType}-${size}-tablet-line-height;
\t\tfont-size: $${prefix}-typography-${typoType}-${size}-tablet-font-size;
\t\tfont-weight: $${prefix}-typography-${typoType}-${size}-tablet-font-weight;
\t}\n`;

		result += `
\t@media only screen and (min-width: ${screens.lg.value}) {
\t\tline-height: $${prefix}-typography-${typoType}-${size}-desktop-line-height;
\t\tfont-size: $${prefix}-typography-${typoType}-${size}-desktop-font-size;
\t\tfont-weight: $${prefix}-typography-${typoType}-${size}-desktop-font-weight;
\t}
		`;
	} else {
		result += '/* ERROR: Missing media queries*/';

		result += `
\tline-height: $${prefix}-typography-${typoType}-${size}-line-height;
\tfont-size: $${prefix}-typography-${typoType}-${size}-font-size;
\tfont-weight: $${prefix}-typography-${typoType}-${size}-font-weight;
`;
	}

	result += `
}
	`;

	return result;
};

const generateClasses = (typography, screens, utility) => {
	let allClasses = fileHeader;

	Object.keys(typography).forEach((typoTypeKey) => {
		const typeObject = typography[typoTypeKey];
		Object.keys(typeObject).forEach((sizeKey) => {
			const sizeObject = typeObject[sizeKey];
			let missingMediaQuery = false;
			if (
				!(sizeObject.mobile && sizeObject.tablet && sizeObject.desktop)
			) {
				missingMediaQuery = true;
			}
			allClasses += getUtilityClass(
				utility,
				screens,
				typoTypeKey,
				sizeKey,
				missingMediaQuery
			);
		});
	});

	return allClasses;
};

module.exports = generateClasses;
