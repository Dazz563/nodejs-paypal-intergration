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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.products = require('./product.model.js')(sequelize, DataTypes, Op);
db.categories = require('./category.model.js')(sequelize, DataTypes, Op);
db.users = require('./user.model.js')(sequelize, DataTypes, Op);
db.reviews = require('./review.model.js')(sequelize, DataTypes, Op);

// Relations
// products - categories
db.categories.hasMany(db.products, {foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.products.belongsTo(db.categories, {foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
// products - reviews
db.products.hasMany(db.reviews, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.reviews.belongsTo(db.products, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Sync the database and create tables
(async () => {
	try {
		await db.sequelize.authenticate();
		console.log('connected to DB');
		await db.sequelize.sync({alter: false});
		console.log('sync completed');
	} catch (error) {
		console.log('error syncing', error);
	}
})();

module.exports = db;
