module.exports = (sequelize, DataTypes, Op) => {
    const Review = sequelize.define('review', {
        rating: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
    });

    return Review;
};
