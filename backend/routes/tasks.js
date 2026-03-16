import { Router } from 'express';
import { Task } from '../models/index.js';

const router = Router();
const clientIdHeader = 'x-client-id';
const maxClientIdLength = 128;

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.use('/api/tasks', (req, res, next) => {
    const clientId = req.get(clientIdHeader)?.trim();

    if (!clientId || clientId.length > maxClientIdLength) {
        return res.status(400).json({ message: 'Missing or invalid x-client-id header' });
    }

    req.clientId = clientId;
    next();
});

router.get('/api/tasks', async (req, res) => {
    const tasks = await Task.findAll({ where: { clientId: req.clientId } });
    res.status(200).json(tasks);
});

router.post('/api/tasks', async (req, res) => {
    const { text } = req.body;
    const task = await Task.create({ text, clientId: req.clientId });
    res.status(201).json(task);
});

router.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Task.destroy({ where: { id, clientId: req.clientId } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const task = await Task.findOne({ where: { id, clientId: req.clientId } });
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.text = text;
    await task.save();
    res.status(200).json(task);
});

export default router;
