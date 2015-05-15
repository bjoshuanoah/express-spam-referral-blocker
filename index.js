var spamReferrers = require('./lib/spam.json').spamReferrers,
	url = require('url');
	
module.exports = function (req, res, next) {
	var referer = req.get('referer'),
		parsedUrl,
		host;
	if (referer) {
		parsedUrl = url.parse(referer)
		host = parsedUrl.host;
		if (spamReferrers.indexOf(host) !== -1) {
			return res.status(404).end();
		}
	}
	next();
}