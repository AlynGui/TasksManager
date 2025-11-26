import * as taskService from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { title, description, assignee, dueDate } = req.body;
  const task = await taskService.createTask({
    title,
    description,
    assignee,
    dueDate: dueDate ? new Date(dueDate) : null
  });
  res.json(task);
};

export const changeTaskStatus = async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const task = await taskService.updateTaskStatus(id, status);
  res.json(task);
};

export const removeTask = async (req, res) => {
  const id = Number(req.params.id);
  await taskService.deleteTask(id);
  res.json({ success: true });
};
