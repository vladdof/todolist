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
    res.json(tasks);
});

router.post('/api/tasks', async (req, res) => {
    const { text } = req.body;
    const task = await Task.create({ text });
    res.json(task);
});

router.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.destroy({ where: { id } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

export default router;
