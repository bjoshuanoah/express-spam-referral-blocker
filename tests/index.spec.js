var assert = require("assert"),
	spamBlocker = require('../'),
	spamReferrers = spamBlocker.getSpamReferrers();

function Res() {
	var _this = this;
	this.statusCode = 200;
	this.payload = '';
	this.status = function(statusCode) {
		_this.statusCode = statusCode;
		return _this;
	};
	this.end = function(obj) {
		_this.payload = obj;
		return _this;
	};
}

function Req(referer) {
	var _this = this;
	this.referer = referer;
	this.get = function(item) {
		return _this[item];
	};
}

describe('send404()', function() {

	it('should continue if referral url is not in list', function(done) {

		var req = new Req('http://www.facebook.com/user/123123123'),
			res = new Res();

		spamBlocker.send404(req, res, function(err, response) {
			assert(!err);
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	it('should return a 404 if referral url is in list', function(done) {

		var req = new Req('http://4webmasters.org'),
			res = new Res();

		spamBlocker.send404(req, res, function() {});
		assert.equal(res.statusCode, 404);
		done();
	});

	it('should return a 404 if top level domain referral url is in list', function(done) {

		var req = new Req('http://site1.4webmasters.org'),
			res = new Res();

		spamBlocker.send404(req, res, function() {});
		assert.equal(res.statusCode, 404);
		done();
	});

});

describe('refreshPiwikReferrers()', function() {
	it('refresh list of the referral domains from piwik list', function(done) {
		spamBlocker.refreshPiwikReferrers(function(res) {
			assert.equal(res, true);
			done();
		});
	});
});

describe('setReferrers()', function() {

	before(function(done) {
		var ref = ['facebook.com'];
		spamBlocker.setReferrers(ref);
		done();
	});

	after(function(done) {
		spamBlocker.setReferrers(spamReferrers);
		done();
	});

	it('should continue if referral url is not in replaced list', function(done) {

		var req = new Req('http://4webmasters.org'),
			res = new Res();

		spamBlocker.send404(req, res, function(err, response) {
			assert(!err);
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	it('should return a 404 if referral url is in replaced list', function(done) {

		var req = new Req('http://www.facebook.com/user/123123123'),
			res = new Res();

		spamBlocker.send404(req, res, function() {});
		assert.equal(res.statusCode, 404);
		done();
	});

});

describe('addToReferrers()', function() {

	before(function(done) {
		spamBlocker.setReferrers(spamReferrers);
		var ref = ['facebook.com'];
		spamBlocker.addToReferrers(ref);
		done();
	});

	after(function(done) {
		spamBlocker.setReferrers(spamReferrers);
		done();
	});

	it('should return a 404 if referral url is in appended list', function(done) {
		var req = new Req('http://4webmasters.org'),
			res = new Res();

		spamBlocker.send404(req, res, function() {});
		assert.equal(res.statusCode, 404);
		done();
	});

	it('should return a 404 if referral url is in appended list', function(done) {
		var req = new Req('http://www.facebook.com/user/123123123'),
			res = new Res();

		spamBlocker.send404(req, res, function() {});
		assert.equal(res.statusCode, 404);
		done();
	});



});
