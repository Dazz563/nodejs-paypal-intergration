require('dotenv').config({path: '.env'});

exports.config = {
	development: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
	test: {
		// username: env.PG_USERNAME,
		// password: env.PG_PASSWORD,
		// database: 'sample_db',
		// host: env.PG_HOST,
		// port: env.PG_PORT,
		// dialect: 'postgres',
	},
	production: {
		// username: env.PG_USERNAME,
		// password: env.PG_PASSWORD,
		// database: 'sample_db',
		// host: env.PG_HOST,
		// port: env.PG_PORT,
		// dialect: 'postgres',
	},
};
