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
  }),

  FlightTargeting: db.define('flightTargeting', {
  }),

  FlightTargetingValue: db.define('flightTargetingValue', {
    value: S.STRING
  }),

  Targeting: db.define('targeting', {
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
