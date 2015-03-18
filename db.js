var S = require('sequelize');

var db = new S('volk', 'volk', 'password');

obj = {
  db: db,

  User: db.define('user', {
      firstName: { type: S.STRING },
      lastName: { type: S.STRING }
    }),

  Flight: db.define('flight', { 
      flightName: S.STRING,
      startDate: S.DATE,
      endDate: S.DATE
    }),

  Order: db.define('order', { 
      orderName: S.STRING,
      startDate: S.DATE,
      endDate: S.DATE
    }),

  Creative: db.define('creative', { 
    creativeName: S.STRING,
    creativeContent: S.STRING
  }),


  Advertiser: db.define('advertiser', { 
    advertiserName: S.STRING,
  })//
}

obj.Flight.belongsTo(obj.Order);
obj.Order.hasMany(obj.Flight);
obj.Creative.belongsToMany(obj.Flight, { through: 'CreativeFlight' });
obj.Flight.hasMany(obj.Creative);

module.exports = obj;
