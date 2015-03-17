var koa = require('koa');
var app = koa();
var router = require('./router');
var db = require('./db');

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
