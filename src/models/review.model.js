module.exports = (sequelize, DataTypes, Op) => {
	const Review = sequelize.define('review', {
		rating: {
			type: DataTypes.INTEGER,
		},
		description: {
			type: DataTypes.TEXT,
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
	});

	return Review;
};
