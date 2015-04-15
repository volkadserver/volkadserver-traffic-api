var S = require('sequelize');

var db = new S('volk', 'volk', 'password');

obj = {
  db: db,

  User: db.define('User', {
      firstName: { type: S.STRING },
      lastName: { type: S.STRING }
    }),

  Flight: db.define('Flight', { 
      flightName: S.STRING,
      startDate: S.DATE,
      endDate: S.DATE
    }),

  Order: db.define('Order', { 
      orderName: S.STRING,
      startDate: S.DATE,
      endDate: S.DATE
    }),

  Creative: db.define('Creative', { 
    creativeName: S.STRING,
    creativeContent: S.STRING
  }),


  Advertiser: db.define('Advertiser', { 
    advertiserName: S.STRING,
  }),

  FlightTargeting: db.define('FlightTargeting', {
  }),

  FlightTargetingValue: db.define('FlightTargetingValue', {
    value: S.STRING
  }),

  Targeting: db.define('Targeting', {
    targetingName: S.STRING
  })
}

obj.Flight.belongsTo(obj.Order);
obj.Order.hasMany(obj.Flight);
obj.Creative.belongsToMany(obj.Flight, { through: 'CreativeFlight' });
obj.Flight.hasMany(obj.Creative);
obj.Flight.hasMany(obj.Targeting, { through: obj.FlightTargeting });
obj.Targeting.belongsToMany(obj.Flight, { through: obj.FlightTargeting });
obj.FlightTargeting.hasOne(obj.FlightTargetingValue);
obj.FlightTargetingValue.belongsToMany(obj.FlightTargeting);

module.exports = obj;
