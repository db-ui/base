/*
 * Fetches all branches and deletes all review-branches in github pages
 */
const FS = require('fs');

const removeOldFromPath = (isTag, data) => {
	let result = '';
	const path = `public/${isTag ? 'version' : 'review'}`;
	if (FS.existsSync(path) && data?.length > 0) {
		const dirsToDelete = FS.readdirSync(path).filter(
			(file) => !data.find((branch) => branch.name === file)
		);
		if (dirsToDelete?.length > 0) {
			result += `Start removing ${
				isTag ? 'tags' : 'branches'
			} from gh-pages`;
			result += JSON.stringify(dirsToDelete);
			dirsToDelete.forEach((dir) => {
				FS.rmSync(`${path}/${dir}`, {
					recursive: true,
					force: true
				});
				result += `deleted  ${isTag ? 'tag' : 'branch'} ${dir}`;
			});
		} else {
			result += `All ${isTag ? 'tags' : 'branches'} are up to date`;
		}
	}
	return result;
};

module.exports = async ({ github, context }) => {
	const { repo, owner } = context.repo;
	const branches = await github.rest.repos.listBranches({
		owner,
		repo
	});
	const tags = await github.rest.repos.listTags({
		owner,
		repo
	});
	let result = '';
	result += removeOldFromPath(false, branches);
	result += '\n';
	result += removeOldFromPath(true, tags);
	return result;
};
