module.exports = function (Handlebars) {
	Handlebars.registerHelper(
		'spacing-examples',
		function (context, contextObjName, tableHeader, filterKey) {
			const contextSort = require('./context-sort');
			const cSort = contextSort(context);

			if (!cSort) {
				return 'Error';
			}

			const result = `
				<div style="display: flex; gap:8px; flex-direction: column">
				<strong>${tableHeader}</strong>
				${cSort[contextObjName]
					.filter((s) => s.key.includes(filterKey))
					.map(
						(spacing) =>
							`<div>
						<span>spacing-${spacing.key}:</span>
						<div style="width: ${
							Number(spacing.value) / 16
						}rem;" class="DO-NOT-COPY-THIS-CLASS-example-spacing"></div>
						</div>`
					)
					.join('')}</div>`;
			return new Handlebars.SafeString(result);
		}
	);
};
