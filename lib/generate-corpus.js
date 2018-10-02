/**
 * @file
 * Helper functions for generating text corpora
 */

const {
	parseLinks,
	cleanToot
} = require('./util');

const paginate = async (M, currLink) => {
	try {
		console.log(`Next page: ${currLink}`);
		const {resp, data} = await M.get(currLink);
		const {next, prev} = parseLinks(resp.headers.link);
		if (next) {
			return [...data, ...await paginate(M, next)];
		}

		return [...data];
	} catch (error) {
		console.error(error);
	}
};

const getUserToots = async (M, user) => {
	try {
		const {resp, data} = await M.get(`accounts/${user}/statuses`, {limit: 40});
		const {next} = parseLinks(resp.headers.link);

		if (next) {
			return [
				...data,
				...await paginate(M, next)
			].map(cleanToot);
		}
	} catch (error) {
		console.error(error);
	}
};

const getUserId = async (M, user) => {
	const {data} = await M.get('accounts/search', {
		q: user,
		resolve: true
	});

	if (data && data.length > 0) {
		const [user] = data;
		return user.id;
	}

	throw new Error(`User not found: ${user}`);
};

module.exports = {
	getUserToots,
	getUserId
};
