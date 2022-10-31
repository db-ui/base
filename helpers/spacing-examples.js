module.exports = function (Handlebars) {
	Handlebars.registerHelper(
		'spacing-examples',
		function (context, contextObjName, tableHeader, filterKey) {
			const contextSort = require('./context-sort');
			const cSort = contextSort(context);
			const result = cSort[contextObjName]
				.filter((s) => s.key.includes(filterKey))
				.map(
					(spacing) =>
						`
						<div>
						<span>spacing-${spacing.key}:</span>
						<div style="width: ${
							Number(spacing.value) / 16
						} rem;" class="DO-NOT-COPY-THIS-CLASS-example-spacing"></div>
						</div>
					`
				)
				.join('</br>');
			return new Handlebars.SafeString(result);
		}
	);
};
