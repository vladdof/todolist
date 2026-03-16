import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Task = sequelize.define('Task', {
    clientId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
