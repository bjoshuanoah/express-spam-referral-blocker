# express-spam-referral-blocker [![Build Status](https://travis-ci.org/bjoshuanoah/express-spam-referral-blocker.svg?branch=master)](https://travis-ci.org/bjoshuanoah/express-spam-referral-blocker)
Express middleware that blocks referral spam, and sends a 404.


## Usage

  install

    npm install express-spam-referral-blocker --save

  use middleware

    var spamBlocker = require('express-spam-referral-blocker');
    app.use(spamBlocker.send404);


## Advanced Usage

  Replace list of referals to block

  	spamBlocker.setReferrers(['google.com', 'yahoo.com']);

  Add to list of referals to block

  	spamBlocker.addToReferrers(['google.com', 'yahoo.com']);


##  Spammers list

Uses [community-contributed list](https://github.com/piwik/referrer-spam-blacklist) of referrer spammers maintained by [Piwik](http://piwik.org/), and allows to use custom list as addition to it.

## Contribute

    Update and add tests to tests/**/*.spec.js
    Pull requests will verify that tests pass
