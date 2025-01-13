import { Router } from 'express';
import { Task } from '../models/index.js';

const router = Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.get('/api/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
});

router.post('/api/tasks', async (req, res) => {
    const { text } = req.body;
    const task = await Task.create({ text });
    res.status(201).json(task);
});

router.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Task.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

export default router;
