/**
 * @file
 * Various utility functions
 */

const stripTags = require('striptags');

const stripUsers = str => str.replace(/@<span>[a-zA-Z0-9.-_]*<\/span>?/g, '');
const stripRTs = str => str.replace(/\s?RT\s?/g, '');
const stripUrls = str => str.replace(/http\S+/g, '');

const filters = [
	stripUsers,
	stripTags,
	stripRTs,
	stripUrls
];

const parseLinks = link => {
	if (!link) {
		return false;
	}
	const next = link.replace(/.*<([^>]+?)>; rel="next".*/, '$1');
	const prev = link.replace(/.*<([^>]+?)>; rel="prev".*/, '$1');

	return {
		next, prev
	};
};

module.exports = {
	parseLinks,
	cleanToot: toot => filters.reduce((acc, filter) => filter(acc), toot)
};
