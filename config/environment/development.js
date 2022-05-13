module.exports = {
	appName: 'cortesdev-api',
	path: {
	},
	log: {
		level: 'info',
		external: true
	},
	secretKey: "secretKey",
	mysql: {
		central:{
			db: {
				user: process.env.MYSQL_USER || 'cco39814_sistemas',
				password: process.env.MYSQL__PASS || 'Ripperowen1986-',
				database: process.env.MYSQL_DB || 'cco39814_sistemas',
				host: process.env.MYSQL_HOST || 'cortesdev.cl',
				port: process.env.MYSQL_PORT || '3306',
				connectionLimit: 100
			}
		},
		cortesdev:{
			db: {
				user: process.env.MYSQL_USER || 'cco39814_sistemas',
				password: process.env.MYSQL__PASS || 'Ripperowen1986-',
				database: process.env.MYSQL_DB || 'cco39814_sistemas',
				host: process.env.MYSQL_HOST || 'cortesdev.cl',
				port: process.env.MYSQL_PORT || '3306',
				connectionLimit: 100
			}
		}		
	}
}