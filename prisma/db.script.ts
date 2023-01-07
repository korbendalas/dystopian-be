import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRawUnsafe('DROP schema public CASCADE');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('DROP TABLE');
    await prisma.$disconnect();
  });
