module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 128]
            }
        }
    });
    Reviews.associate = (db) => {
        Reviews.belongsTo(db.User, {
            foreignKey: {
                allowNull:false
            }
        });
    };
    return Reviews;
};
