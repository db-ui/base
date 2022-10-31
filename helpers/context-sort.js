const sort = (arr) => {
	return arr.sort((a, b) => {
		const numberA = Number(a.key);
		const numberB = Number(b.key);
		if (numberA < numberB) {
			return -1;
		}

		if (numberA > numberB) {
			return 1;
		}

		return 0;
	});
};

const getValueRecursive = (initData, results, fullKeyString) => {
	if (initData instanceof Object) {
		try {
			const dataKeys = Object.keys(initData);
			if (dataKeys.some((sKey) => sKey.includes('value'))) {
				results.push({ key: fullKeyString, value: initData['value'] });
			} else {
				for (const topLvlKey of dataKeys) {
					getValueRecursive(
						initData[topLvlKey],
						results,
						`${fullKeyString}-${topLvlKey}`
					);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	return results;
};

module.exports = (context) => {
	if (!context.spacing || !context.sizing) {
		return undefined;
	}
	let spacings = getValueRecursive(context.spacing, [], '').map(
		(spacing) => ({ ...spacing, key: `db-spacing${spacing.key}` })
	);
	let sizings = getValueRecursive(context.sizing, [], '').map((sizing) => ({
		...sizing,
		key: `db-sizing${sizing.key}`
	}));

	spacings = sort(spacings);
	sizings = sort(sizings);
	return { spacings, sizings };
};
