const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function registerUser(data) {
  try {
    const user = await prisma.user.create({ data: { ...data } });
    delete user["password"];
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser };
