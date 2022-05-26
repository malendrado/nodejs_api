'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
	'GET /health/':{
		controller: 'healthController',
		action: 'health',
        auth: false
	},
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
	},
	'GET /users/':{
		controller: 'mysqlController/userController',
		action: 'getAll',
        auth: true
	},
	'GET /users/getById/:id':{
		controller: 'mysqlController/userController',
		action: 'getById',
        auth: true
	},
	'POST /users/create/':{
		controller: 'mysqlController/userController',
		action: 'create',
        auth: false,
		dataRequired: ['rut', 'nombres', 'paterno', 'materno', 'mail', 'telefono']
	},
	'PUT /users/udateById/:id':{
		controller: 'mysqlController/userController',
		action: 'updateById',
        auth: false
	},
	'DELETE /users/deleteById/:id':{
		controller: 'mysqlController/userController',
		action: 'deleteById',
        auth: false
	},
	'GET /users/getUserRelacion/:id_usuario/:id_sistema':{
		controller: 'mysqlController/userController',
		action: 'getUserRelacion',
        auth: false
	},
	'GET /doctors/':{
		controller: 'mysqlController/doctorsController',
		action: 'getAll',
        auth: false
	},
	'GET /doctors/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'getId',
        auth: true
	},
	'GET /doctors/getRelationSpecialities/:id_medico':{
		controller: 'mysqlController/doctorsController',
		action: 'getRelationSpecialities',
        auth: false,		
	},
    'POST /doctors/create/':{
		controller: 'mysqlController/doctorsController',
		action: 'create',
        auth: false,
		dataRequired: ['rut', 'nombres', 'apellidos']
	},
    'PUT /doctors/updateById/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'updateById',
        auth: true,
		dataRequired: ['id']
	},
    'DELETE /doctors/deleteById/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'deleteById',
        auth: true
	},
	'GET /patients/':{
		controller: 'mysqlController/patientsController',
		action: 'getAll',
        auth: false
	},
	'GET /patients/:id':{
		controller: 'mysqlController/patientsController',
		action: 'getById',
        auth: true
	},
    'POST /patients/create/':{
		controller: 'mysqlController/patientsController',
		action: 'create',
        auth: true,
		dataRequired: ['rut', 'nombres', 'apellidos', 'direccion', 'genero', 'fecha_nacimiento']
	},
    'PUT /patients/updateById/:id':{
		controller: 'mysqlController/patientsController',
		action: 'updateById',
        auth: true
	},
    'DELETE /patients/deleteById/:id':{
		controller: 'mysqlController/patientsController',
		action: 'deleteById',
        auth: true
	},
	'GET /schedules/':{
		controller: 'mysqlController/scheludesController',
		action: 'getAll',
        auth: false
	},
	'GET /schedules/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'getById',
        auth: true
	},
    'POST /schedules/create/':{
		controller: 'mysqlController/scheludesController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'fecha_atencion', 'hora_inicio', 'hora_termino']
	},
    'PUT /schedules/updateById/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'updateById',
        auth: true,
		dataRequired: ['id_medico', 'fecha_atencion', 'hora_inicio', 'hora_termino']
	},
    'DELETE /schedules/deleteById/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'deleteById',
        auth: true
	},
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
	},
	'GET /relationDocSpe/':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getAll',
        auth: false,		
	},
	'GET /relationDocSpe/getByIdDoctor/:id_medico':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getByIdDoctor',
        auth: false,		
	},
	'GET /relationDocSpe/getByIdSpecialty/:id_especialidad':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getByIdSpecialty',
        auth: false,		
	},
	'POST /relationDocSpe/create':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'id_especialidad']
	},
    'DELETE /relationDocSpe/deleteById/:id_medico/:id_especialidad':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'deleteById',
        auth: true
	},
	'GET /appointment/':{
		controller: 'mysqlController/appointmentController',
		action: 'getAll',
        auth: false,		
	},
	'GET /appointment/:fecha_atencion':{
		controller: 'mysqlController/appointmentController',
		action: 'getByDate',
        auth: false,		
	},
	'GET /appointment/getByIdDoctor/:id_medico':{
		controller: 'mysqlController/appointmentController',
		action: 'getByIdDoctor',
        auth: false,		
	},
	'GET /appointment/getByIdPatient/:id_paciente':{
		controller: 'mysqlController/appointmentController',
		action: 'getByIdPatient',
        auth: false,		
	},
    'POST /appointment/create/':{
		controller: 'mysqlController/appointmentController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'id_paciente', 'fecha_atencion', 'inicio']
	},
    'PUT /appointment/updateById/:id':{
		controller: 'mysqlController/appointmentController',
		action: 'updateById',
        auth: true
	}
}