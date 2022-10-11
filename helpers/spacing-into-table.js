module.exports = function (Handlebars) {
	Handlebars.registerHelper('spacing-into-table', function (context) {
		const SpacingSort = require('./spacing-sort');
		const spacings = SpacingSort(context);

		const tableObj = {
			caption: 'Spacing overview',
			headers: ['Token', 'Value', 'Ratio'],
			rows: spacings.map((spacing) => ({
				Token: [null, `spacing-${spacing.key}`],
				Value: [null, spacing.value],
				Ratio: [null, spacing.key]
			}))
		};

		const tableStringify = JSON.stringify(tableObj).replace(/"/g, '&quot;');
		const table = `<db-table border="around" stripes="zebra" tabledata="${tableStringify}"></db-table>`;

		return new Handlebars.SafeString(table);
	});
};
