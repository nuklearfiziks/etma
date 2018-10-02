/**
 * @file
 * etma-bot
 * 2018 Andi N. Fiziks (@nuklearfiziks@bofa.lol)
 *
 * Simple Markov-chains-based Mastodon bot
 */

const Mastodon = require('mastodon-api');
const Markov = require('markov-strings');

const {
	ACCESS_TOKEN,
	API_URL = 'https://botsin.space/api/v1/',
	USERNAME = '@Pyretta@girlcock.club',
	POST_EVERY_X_MINUTES = 30,
	MAX_LENGTH = 400,
	MIN_WORDS = 10,
	MIN_SCORE = 25
} = process.env;

if (!ACCESS_TOKEN) {
	throw new Error('Please supply an access token via env var ACCESS_TOKEN!');
}

const {
	getUserToots,
	getUserId
} = require('./lib/generate-corpus');

const M = new Mastodon({
	access_token: ACCESS_TOKEN,
	api_url: API_URL
});

(async () => {
	try {
		const userId = await getUserId(M, USERNAME);
		const toots = await getUserToots(M, userId);
		const marky = new Markov(toots, {
			maxLength: MAX_LENGTH,
			minWords: MIN_WORDS,
			minScore: MIN_SCORE,
			filter: result => {
				return result.string.endsWith('.'); // I want my tweets to end with a dot.
			}
		});
		await marky.buildCorpus();
		setInterval(async () => {
			try {
				const status = await marky.generateSentence();
				await M.post('statuses', {status});
			} catch (error) {
				console.error(error);
			}
		}, POST_EVERY_X_MINUTES * 60 * 1000);
	} catch (error) {
		console.error(error.statusCode);
	}
})();
