'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
	'POST /loginRut/':{
		controller: 'mysqlController/loginController',
		action: 'loginRut',
        auth: false,
		dataRequired: ['rut', 'pass']
	},
	'POST /loginEmail/':{
		controller: 'mysqlController/loginController',
		action: 'loginEmail',
        auth: false,
		dataRequired: ['email', 'pass']
	},
	'PUT /loginUpdatePassword/:id':{
		controller: 'mysqlController/loginController',
		action: 'loginUpdatePassword',
        auth: false,
		dataRequired: ['password']
	},
	'PUT /forgotPassword/':{
		controller: 'mysqlController/loginController',
		action: 'loginUpdatePassword',
        auth: false,
		dataRequired: ['rut']
	}
}