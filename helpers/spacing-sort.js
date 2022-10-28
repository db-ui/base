module.exports = (context) => {
	let spacings = [];
	for (const key of Object.keys(context.data.root.spacing)) {
		spacings.push({
			key,
			value: context.data.root.spacing[key].value
		});
	}

	spacings = spacings.sort((a, b) => {
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
	return spacings;
};
