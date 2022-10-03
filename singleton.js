const { PrismaClient } = require("@prisma/client");
const { mockDeep, mockReset, DeepMockProxy } = require("jest-mock-extended");
const prisma = require("./client");

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = prismaMock = prisma;
