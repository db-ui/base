module.exports = function (Handlebars) {
	Handlebars.registerHelper('table', function (context) {
		if (context.data.root.table) {
			const tableStringify = JSON.stringify(
				context.data.root.table
			).replace(/"/g, '&quot;');
			const table = `<db-table tabledata="${tableStringify}"></db-table>`;

			return new Handlebars.SafeString(table);
		}

		return '<span>ERROR TABLE</span>';
	});
};
