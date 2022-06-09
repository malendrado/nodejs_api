'use strict';
/* jshint strict: false, esversion: 6 */
const login = require('./routes/login');
const user = require('./routes/user');
const doctor = require('./routes/doctor');
const patient = require('./routes/patient');
const schedule = require('./routes/schedule');
const specialty = require('./routes/specialty');
const appointment = require('./routes/appointment');

module.exports = {
	health: { 
		'GET /health/':{
			controller: 'healthController',
			action: 'health',
			auth: false
		}
	},
	login,
	user,
	doctor,
	patient,
	schedule,
	specialty,
	appointment
}