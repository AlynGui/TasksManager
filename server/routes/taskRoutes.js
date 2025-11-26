import express from 'express';
import {
  getTasks,
  addTask,
  changeTaskStatus,
  removeTask
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.patch('/:id', changeTaskStatus);
router.delete('/:id', removeTask);

export default router;
