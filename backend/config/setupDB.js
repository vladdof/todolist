import { sequelize } from './database.js';
import { Task } from '../models/index.js';

export const setupDB = async () => {
    try {
        await sequelize.sync({ force: true });
        await Task.create({ text: "Task-1" });
        await Task.create({ text: "Task-2" });
        await Task.create({ text: "Task-3" });
    } catch (error) {
        console.error(error);
    }
};
