var inflection = require('inflection');
var router = require('koa-router')();
var db = require('./db')
db.db.sync({ force: true });


router.get('base', '/', function *(next) { this.body = 'API root'; });

router.get('/api/:resource', function *(next) {
  var singular = inflection.capitalize(inflection.singularize(this.params.resource));
  this.body = yield db[singular].findAll();
});

router.get('/api/:resource/:id', function *(next) {
  var singular = inflection.capitalize(inflection.singularize(this.params.resource));
  this.body = yield db[singular].findOne(this.params.id);
});

router.get('/api/:resource/:id/:subResource', function *(next) {
  var resource = inflection.capitalize(inflection.singularize(this.params.resource));
  var subResource = inflection.capitalize(inflection.singularize(this.params.subResource));
  try {
    var parent = yield db[resource].findOne({ id: this.params.id, include: [db[subResource]] });
    this.body = parent[this.params.subResource];
  }
  catch(err) {
    // Resource doesn't exist? some other error?
    console.log(err);
  }
});

router.post('/api/:resource', function *(next) {
  var resource = inflection.capitalize(inflection.singularize(this.params.resource));
  this.body = yield db[resource].create(this.request.body);
});

router.post('/api/:resource/:id/:subResource', function *(next) {
  var resource = inflection.capitalize(inflection.singularize(this.params.resource));
  var subResource = inflection.capitalize(inflection.singularize(this.params.subResource));
  this.request.body[inflection.camelize(resource, true)+'Id'] = this.params.id;

  try { this.body = yield db[subResource].create(this.request.body) }
  catch(err) { console.log(err); }
});

module.exports = router;
