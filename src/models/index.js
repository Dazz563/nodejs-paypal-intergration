const {config} = require('../../config/dbConfig');

const {Sequelize, DataTypes, Op} = require('sequelize');

// Developement
const sequelize = new Sequelize(config.development.database, config.development.user, config.development.password, {
	host: config.development.host,
	port: config.development.port,
	dialect: config.development.dialect,
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
db.orders = require('./order.model')(sequelize, DataTypes, Op);

// Relations
// products - categories (ONE-TO-MANY 1:m) (MANY-TO-ONE m:1)
db.categories.hasMany(db.products, {foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.products.belongsTo(db.categories, {foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
// products - reviews (ONE-TO-MANY 1:m) (MANY-TO-ONE m:1)
db.products.hasMany(db.reviews, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.reviews.belongsTo(db.products, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
// Define the associations between the order, user, and product models (MANY-TO-MANY m:n)
/**
 * Get all orders for a user
 * const user = await User.findByPk(1);
 * const orders = await user.getOrders();
 */
/**
 * Get all orders for a product
 * const product = await Product.findByPk(1);
 * const orders = await product.getOrders();
 */
db.orders.belongsTo(db.users, {foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.orders.belongsTo(db.products, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.users.hasMany(db.orders, {foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.products.hasMany(db.orders, {foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Sync the database and create tables
(async () => {
	try {
		await db.sequelize.authenticate();
		console.log('connected to DB');
		await db.sequelize.sync({alter: true});
		console.log('sync completed');
	} catch (error) {
		console.log('error syncing', error);
	}
})();

module.exports = db;
