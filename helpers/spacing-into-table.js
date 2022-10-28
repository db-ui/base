module.exports = function (Handlebars) {
	Handlebars.registerHelper('spacing-into-table', function (context) {
		const spacingSort = require('./spacing-sort');
		const spacings = spacingSort(context);

		const tableObject = {
			caption: 'Spacing overview',
			headers: ['Token', 'Value', 'Ratio'],
			rows: spacings.map((spacing) => ({
				Token: [null, `spacing-${spacing.key}`],
				Value: [null, spacing.value],
				Ratio: [null, spacing.key]
			}))
		};

		const tableStringify = JSON.stringify(tableObject).replace(
			/"/g,
			'&quot;'
		);
		const table = `<db-table border="around" stripes="zebra" tabledata="${tableStringify}"></db-table>`;

		return new Handlebars.SafeString(table);
	});
};
