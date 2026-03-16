import { sequelize } from './database.js';
import { Task } from '../models/index.js';

export const setupDB = async () => {
    try {
        await sequelize.sync();

        const tasksCount = await Task.count();

        if (tasksCount === 0) {
            await Task.bulkCreate([
                { text: "Task-1" },
                { text: "Task-2" },
                { text: "Task-3" },
            ]);
        }
    } catch (error) {
        console.error(error);
    }
};
