module.exports = async ({ github, context }, head, base) => {
	try {
		const { repo, owner } = context.repo;
		const result = await github.rest.pulls.create({
			title: 'Auto Update from main',
			owner,
			repo,
			head: `${head}`,
			base: `${base}`,
			body: '(o゜▽゜)o ☆ ☜(ﾟヮﾟ☜)'
		});

		await github.rest.issues.addLabels({
			owner,
			repo,
			issue_number: result.data.number,
			labels: ['automated update']
		});

		await github.pulls.createReview({
			owner,
			repo,
			pull_number: result.data.number,
			event: 'APPROVE'
		});

		return result.data.html_url;
	} catch (e) {
		console.error(e);
	}
	return false;
};
