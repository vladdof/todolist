import { sequelize } from './database.js';
import { Task } from '../models/index.js';

export const setupDB = async () => {
    try {
        await sequelize.sync();

        const tasksCount = await Task.count();

        if (tasksCount === 0) {
            await Task.bulkCreate([
                { text: "Task-1", clientId: "demo-user" },
                { text: "Task-2", clientId: "demo-user" },
                { text: "Task-3", clientId: "demo-user" },
            ]);
        }
    } catch (error) {
        console.error(error);
    }
};
