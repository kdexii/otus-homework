const sequelize = require('../config/database'); // Импортируем sequelize из файла конфигурации
const User = require('./user'); // Импортируем модель пользователя

// Экспортируем sequelize и модель пользователя
module.exports = {
    sequelize,
    User
};
