var inflection = require('inflection');
var _ = require('lodash');
var router = require('koa-router')();
var db = require('./db')
db.db.sync({ force: true });

function singularize(resource) {
  var resource = _.startCase(resource)
    .split(' ');
  resource[resource.length - 1] = inflection.singularize(resource[resource.length - 1]);
  resource = resource.join('');

  return resource;
}


router.get('base', '/', function *(next) { this.body = 'API root'; });

router.get('/api/:resource', function *(next) {
  var options = {};
  var query = this.request.query;
  if(query && query.getRelated) {
    var relatedModel = singularize(query.getRelated);
    if(db[relatedModel]) options.include = db[relatedModel];
    else { } // TODO: let the user know the model doesn't exist...
  }
  this.body = yield db[singularize(this.params.resource)].findAll(options);
});

router.get('/api/:resource/:id', function *(next) {
  var singular = singularize(this.params.resource);
  this.body = yield db[singular].findOne(this.params.id);
});

router.get('/api/:resource/:id/:subResource', function *(next) {
  var resource = singularize(this.params.resource);
  var subResource = singularize(this.params.subResource);
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
  var resource = singularize(this.params.resource);
  this.body = yield db[resource].create(this.request.body);
});

router.post('/api/:resource/:id/:subResource', function *(next) {
  var resource = singularize(this.params.resource);
  var subResource = singularize(this.params.subResource);
  this.request.body[inflection.camelize(resource, true)+'Id'] = this.params.id;

  try { this.body = yield db[subResource].create(this.request.body) }
  catch(err) { console.log(err); }
});

module.exports = router;
