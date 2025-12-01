import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all tasks for a specific user
export const getTasksByUserId = async (userId) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { dueDate: 'asc' }
  });
};

// Create a new task
export const createTask = async (data) => {
  return await prisma.task.create({ data });
};

// Get a task by user ID
export const updateTaskStatusById = async (id, status) => {
  return await prisma.task.update({
    where: { id },
    data: { status }
  });
};

// Update a task by ID
export const updateTaskById = async (id, updatedData) => {
  return await prisma.task.update({
    where: { id },
    data: updatedData
  });
};

// Delete a task by ID
export const deleteTaskById = async (id) => {
  return await prisma.task.delete({ where: { id } });
};
