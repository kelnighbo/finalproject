module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define('appointments', {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Appointments;
};