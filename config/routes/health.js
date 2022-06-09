'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
	'GET /health/':{
		controller: 'healthController',
		action: 'health',
        auth: false
	}
}