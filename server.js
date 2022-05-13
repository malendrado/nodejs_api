'use strict';

const PORT = process.env.PORT || 8001;
const ENV = process.env.NODE_ENV || 'development';

global.Koa = {};
global.Koa.config = require('./config/environment/' + ENV);

let routes = require('./config/routes');
const helperService = require('./services/helperService');
const authentication = require('./config/authentication')

global.env = ENV;
global._ = require('lodash');

let app = new (require('koa'))();
let router = new (require('koa-router'))();
let bodyParser = require('koa-bodyparser')();

_.forEach(routes, (route, key) => {
	key = key.match(/\S+/g);
	router[key[0].toLowerCase()](key[1], async ctx => {
		
		let valid = true;
		if (route.auth)
			valid = authentication.validateToken(ctx);

		global.Koa.config.mysqlused = ctx.request.header.sys ? global.Koa.config.mysql[sys] : global.Koa.config.mysql.central;

		if(valid != true){
			if (route.auth.redirect) {
				ctx.redirect(route.auth.redirect);
			} else {
				throw {status: 401, message: {code: 'AuthError', msg: 'Access denied'}};
			}
			return;
		}
		helperService.validateDataRequired(route.dataRequired, ctx.params);
		console.log('./controllers/' + route.controller, route.action);
		let executable = require('./controllers/' + route.controller)[route.action];
		await executable(ctx);
	});
});

app.use(bodyParser);

app.use(async (ctx, next) => {
	ctx.params = _.assign(ctx.params, ctx.request.query, ctx.request.body);
	ctx.authSession = {
		Authentication: ctx.headers.authentication
	};

	try {
		await next();
	} catch (err) {
		console.error(err);
		let message = err.message || err;
		let status = err.status || 500;

		ctx.status = status;
		ctx.body = (_.isString(message))? {msg: message, code: 'UnknowError'} : message;
	}

	ctx.response.remove('Connection');
	if (ENV === 'development') {
		ctx.response.set('Access-Control-Allow-Origin', '*');
	}
	else {
		ctx.response.set('Access-Control-Allow-Origin', 'https://cortesdev.cl');
		ctx.response.set('X-Frame-Options', 'SAMEORIGIN');
	}
	ctx.response.set('Access-Control-Allow-Headers', 'Authentication, Origin, X-Requested-With, Content-Type, Accept');
	ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	ctx.response.set('Content-Type', 'application/json; charset=utf-8');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
	console.log('Server running at');
	console.log('PORT: ' + PORT);
	console.log('ENV: ' + ENV);
});