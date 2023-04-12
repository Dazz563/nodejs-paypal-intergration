require('dotenv').config({path: '.env'});

exports.config = {
	development: {
		HOST: process.env.DB_HOST,
		USER: process.env.DB_USER,
		PASSWORD: process.env.DB_PASSWORD,
		DB: process.env.DB_NAME,
		PORT: process.env.DB_PORT,
		DIALECT: 'mysql',
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
