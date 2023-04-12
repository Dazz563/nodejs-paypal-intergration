const {config} = require('../../config/dbConfig');

const {Sequelize, DataTypes, Op} = require('sequelize');

// Developement
const sequelize = new Sequelize(config.development.DB, config.development.USER, config.development.PASSWORD, {
	host: config.development.HOST,
	port: config.development.PORT,
	dialect: config.development.DIALECT,
	logging: false,
});

// Testing
// const sequelize = new Sequelize(config.test.DB, config.test.USER, config.test.PASSWORD, {
// 	host: config.test.HOST,
// 	dialect: config.test.DIALECT,
// 	logging: false,
// });

// Production
// const sequelize = new Sequelize(config.production.DB, config.production.USER, config.production.PASSWORD, {
// 	host: config.production.HOST,
// 	dialect: config.production.DIALECT,
// 	logging: false,
// });

(async () => {
	try {
		await sequelize.authenticate();
		console.log('connected to DB');
	} catch (error) {
		console.log('error connecting to DB', error);
	}
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.users = require('./user.model.js')(sequelize, DataTypes, Op);
db.products = require('./product.model.js')(sequelize, DataTypes, Op);
db.reviews = require('./review.model.js')(sequelize, DataTypes, Op);

(async () => {
	try {
		db.sequelize.sync({force: false});
		console.log('sync completed');
	} catch (error) {
		console.log('error syncing', error);
	}
})();

// Relations
// 1 to Many
// db.products.hasMany(db.reviews);
// db.reviews.belongsTo(db.products);
module.exports = db;
