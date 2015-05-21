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


## Current list

  * "4webmasters.org",
  * "best-seo-offer.com",
  * "buttons-for-your-website.com"	

## Contribute

    Update and add tests to tests/**/*.spec.js
    Pull requests will verify that tests pass
