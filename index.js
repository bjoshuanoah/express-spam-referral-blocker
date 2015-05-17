var spamReferrers = require('./lib/spam.json').spamReferrers,
	url = require('url');
	
module.exports.send404 = function (req, res, next) {
	var referer = req.get('referer'),
		parsedUrl,
		host;

	if (referer) {
		parsedUrl = url.parse(referer)
		host = parsedUrl.host;
		if (process.env.DEBUG) {
			console.log('referer', referer);
			console.log('host', host);
		}
		if (spamReferrers.indexOf(host) !== -1) {
			return res.status(404).end();
		}
	}
	next();
}

module.exports.setReferrers = function (list) {
	if (Array.isArray(list)) {
		spamReferrers = list;
	}
}

module.exports.addToReferrers = function (list) {
	if (Array.isArray(list)) {
		spamReferrers.push.apply(spamReferrers, list);
	} else {
		console.log('else')
	}
}
