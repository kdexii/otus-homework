const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Lesson = sequelize.define('Lesson', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resources: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        timestamps: true
    });

    return Lesson;
};
