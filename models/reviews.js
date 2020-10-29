module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
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
        Reviews.belongsTo(db.Users, {
            foreignKey: {
                allowNull:false
            }
        });
    };
    return Reviews;
};
