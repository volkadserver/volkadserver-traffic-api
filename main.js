var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var Sequelize = require('sequelize');

app.use(router.routes());

app.listen(3000);
