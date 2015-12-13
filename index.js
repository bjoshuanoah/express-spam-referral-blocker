var _ = require('underscore-node'),
	url = require('url'),
	request = require('request'),
	topDomain = require('top-domain'),
	fs = require('fs'),
	spamReferrers = getSpamReferrers();

module.exports.send404 = function(req, res, next) {
	var referer = req.get('referer');

	if (referer) {
		host = topDomain(referer);

		if (process.env.DEBUG) {
			console.log('referer', referer);
			console.log('host', host);
		}
		if (spamReferrers.indexOf(host) !== -1) {
			return res.status(404).end();
		}
	}
	next();
};

module.exports.refreshPiwikReferrers = function(next) {
	request('https://raw.githubusercontent.com/piwik/referrer-spam-blacklist/master/spammers.txt',
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var referrers = body.split('\n');
				// because the last line of source file often a blank line
				if (referrers[referrers.length - 1] === "") {
					referrers.pop();
				}

				var spam = {
					spamReferrers: referrers
				};

				fs.writeFile(__dirname . '/lib/piwik.spam.json', JSON.stringify(spam, null, 4), function(err) {
					if (err) {
						console.error(err);
						next(false);
					} else {
						next(true);
					}
				});
			} else {
				next(false);
			}
		});
};

module.exports.setReferrers = function(list) {
	if (Array.isArray(list)) {
		spamReferrers = list;
	}
};

module.exports.addToReferrers = function(list) {
	if (Array.isArray(list)) {
		spamReferrers.push.apply(spamReferrers, list);
	} else {
		console.log('else');
	}
};

function getSpamReferrers() {
	var piwikList, customList, spamList;

	try {
		piwikList = require('./lib/piwik.spam.json').spamReferrers;
	} catch (e) {
		piwikList = [];
	}

	try {
		customList = require('./lib/spam.json').spamReferrers;
	} catch (e) {
		customList = [];
	}

	return _.union(customList, piwikList);

}
module.exports.getSpamReferrers = getSpamReferrers;
