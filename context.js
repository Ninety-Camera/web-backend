const { PrismaClient } = require("@prisma/client");
const { mockDeep, DeepMockProxy } = require("jest-mock-extended");

export const createMockContext = () => {
  return {
    prisma: mockDeep(),
  };
};
