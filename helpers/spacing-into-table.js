module.exports = function (Handlebars) {
	Handlebars.registerHelper(
		'spacing-into-table',
		function (context, contextObjName, tableHeader, filterKey) {
			const contextSort = require('./context-sort');
			const cSort = contextSort(context);

			if (!cSort) {
				return 'Error';
			}

			const tableObject = {
				caption: tableHeader,
				headers: ['Token', 'Value', 'Ratio'],
				rows: cSort[contextObjName]
					.filter((s) => s.key.includes(filterKey))
					.map((spacing) => ({
						Token: [null, `${spacing.key}`],
						Value: [null, `${Number(spacing.value) / 16} rem`],
						Ratio: [null, Number(spacing.value) / 8]
					}))
			};

			const tableStringify = JSON.stringify(tableObject).replace(
				/"/g,
				'&quot;'
			);
			const table = `<db-table border="around" stripes="zebra" tabledata="${tableStringify}"></db-table>`;

			return new Handlebars.SafeString(table);
		}
	);
};
