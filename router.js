var router = require('koa-router')();

router.get('base', '/', function *(next) { this.body = 'API root'; });

module.exports = router;
