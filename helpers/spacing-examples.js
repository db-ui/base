module.exports = function (Handlebars) {
	Handlebars.registerHelper('spacing-examples', function (context) {
		const spacingSort = require('./spacing-sort');
		const spacings = spacingSort(context);
		const result = spacings
			.map(
				(spacing) =>
					`
						<div>
						<span>spacing-${spacing.key}:</span>
						<div style="width: ${spacing.value};" class="DO-NOT-COPY-THIS-CLASS-example-spacing"></div>
						</div>
					`
			)
			.join('</br>');
		return new Handlebars.SafeString(result);
	});
};
