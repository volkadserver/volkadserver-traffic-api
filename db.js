var S = require('sequelize');

var db = new S('volk', 'volk', 'password');

var User = db.define('user', {
    firstName: { type: S.STRING },
    lastName: { type: S.STRING }
  }
);

var Flight = db.define('flight', { 
  flightName: S.STRING,
  startDate: S.DATE,
  endDate: S.DATE
});

var Campaign = db.define('campaign', { 
  campaignName: S.STRING,
  startDate: S.DATE,
  endDate: S.DATE
});

var Creative = db.define('creative', { 
  creativeName: S.STRING,
});


var Advertiser = db.define('advertiser', { 
  advertiserName: S.STRING,
}).sync({ force: true });



module.exports = db;
