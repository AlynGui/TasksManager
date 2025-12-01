import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// User Service Functions
export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

// Get user by email
export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

// Create new user
export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

//  Update user password
export const updateUserPassword = async (id, password) => {
  return await prisma.user.update({
    where: { id },
    data: { password }
  });
};

