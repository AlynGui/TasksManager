import express from 'express';
import {
    addTask,
    changeTaskStatusById,
    deleteTaskById,
    getCurrentUserTasks,
    updateTaskById
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getCurrentUserTasks);
router.post('/', addTask);
router.put('/:id', updateTaskById);
router.put('/updateStatus/:id', changeTaskStatusById);
router.delete('/:id', deleteTaskById);
export default router;
