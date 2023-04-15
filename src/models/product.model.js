module.exports = (sequelize, DataTypes, Op) => {
	const Product = sequelize.define(
		'product',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
			},
			longDescription: {
				type: DataTypes.TEXT,
				field: 'long_description', // Specify the column name in the database
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			getterMethods: {
				longDescription() {
					// Return the value of the longDescription field
					return this.getDataValue('longDescription');
				},
			},
		}
	);

	return Product;
};
