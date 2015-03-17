var router = require('koa-router')();
var db = require('./db')
db.db.sync({ force: true });


router.get('base', '/', function *(next) { this.body = 'API root'; });
router.get('/api/Orders', function *(next) {
  this.body = yield db.Order.findAll();
});
router.get('/api/Flights', function *(next) {
  this.body = yield db.Flight.findAll();
});
router.get('/api/Advertisers', function *(next) {
  this.body = yield db.Advertiser.findAll();
});
router.post('/api/Advertisers', function *(next) {
  this.body = yield db.Advertiser.create(this.request.body);
});
router.post('/api/Orders/:id/Flights', function *(next) {
  this.request.body.orderId = this.params.id;
  this.body = yield db.Flight.create(this.request.body);
});
router.post('/api/Orders', function *(next) {
  this.body = yield db.Order.create(this.request.body);
});

module.exports = router;
