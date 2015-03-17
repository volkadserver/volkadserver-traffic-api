var koa = require('koa');
var app = koa();
var logger = require('koa-logger');
var router = require('./router');
var db = require('./db');


app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
