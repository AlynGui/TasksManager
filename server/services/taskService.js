import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async () => {
  return await prisma.task.findMany({ orderBy: { createdDate: 'desc' } });
};

export const createTask = async (data) => {
  return await prisma.task.create({ data });
};

export const updateTaskStatus = async (id, status) => {
  return await prisma.task.update({
    where: { id },
    data: { status }
  });
};

export const deleteTask = async (id) => {
  return await prisma.task.delete({ where: { id } });
};
