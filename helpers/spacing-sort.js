module.exports = (context) => {
	let spacings = [];
	Object.keys(context.data.root.spacing).forEach((key) => {
		spacings.push({
			key,
			value: context.data.root.spacing[key].value
		});
	});

	spacings = spacings.sort((a, b) => {
		const numA = Number(a.key);
		const numB = Number(b.key);
		if (numA < numB) {
			return -1;
		}
		if (numA > numB) {
			return 1;
		}
		return 0;
	});
	return spacings;
};
