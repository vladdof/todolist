import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Task = sequelize.define('Task', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
