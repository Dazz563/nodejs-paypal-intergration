module.exports = (sequelize, DataTypes, Op) => {
	const Order = sequelize.define(
		'order',
		{
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
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
		{}
	);

	return Order;
};
