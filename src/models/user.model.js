module.exports = (sequelize, DataTypes, Op) => {
	const User = sequelize.define(
		'user',
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: true,
				field: 'refresh_token',
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

	return User;
};
