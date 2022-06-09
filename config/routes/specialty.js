'use strcit'

module.exports = {
    'GET /specialities/':{
		controller: 'mysqlController/specialitiesController',
		action: 'getAll',
        auth: false
	},
	'GET /specialities/:id':{
		controller: 'mysqlController/specialitiesController',
		action: 'getById',
        auth: true
	},
	'POST /specialities/getByName/':{
		controller: 'mysqlController/specialitiesController',
		action: 'getByName',
        auth: true,
		dataRequired: ['nombre']
	},
    'POST /specialities/create/':{
		controller: 'mysqlController/specialitiesController',
		action: 'create',
        auth: true,
		dataRequired: ['nombre', 'descripcion']
	},
    'PUT /specialities/updateById/:id':{
		controller: 'mysqlController/specialitiesController',
		action: 'updateById',
        auth: true,
		dataRequired: ['nombre', 'descripcion']
	},
    'DELETE /specialities/deleteById/:id':{
		controller: 'mysqlController/specialitiesController',
		action: 'deleteById',
        auth: true
	}
}