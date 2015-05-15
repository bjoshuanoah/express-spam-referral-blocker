# express-spam-referral-blocker
Express middleware that blocks referral spam, and sends a 404.


# Usage

  install
  
    npm install express-spam-referral-blocker --save
  
  use middleware
  
    var spamBlocker = require('express-spam-referral-blocker');
    app.use(spamBlocker);


Current list is 
"4webmasters.org",
"best-seo-offer.com",
"buttons-for-your-website.com"	
