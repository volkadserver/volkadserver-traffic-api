var koa = require('koa');
var app = koa();
var logger = require('koa-logger');
var cors = require('koa-cors');
var router = require('./router');
var db = require('./db');


app
  .use(logger())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
