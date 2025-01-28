import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users: Array<{
  email: string;
  name: string;
  password: string;
}> = [
  {
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'password123',
  },
  {
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'password456',
  },
  {
    email: 'bob.wilson@example.com',
    name: 'Bob Wilson',
    password: 'password789',
  },
  {
    email: 'alice.johnson@example.com',
    name: 'Alice Johnson',
    password: 'securepass1',
  },
  {
    email: 'charlie.brown@example.com',
    name: 'Charlie Brown',
    password: 'snoopy123',
  },
  {
    email: 'diana.prince@example.com',
    name: 'Diana Prince',
    password: 'wonder2024',
  },
  {
    email: 'edward.stark@example.com',
    name: 'Edward Stark',
    password: 'winter2024',
  },
  {
    email: 'fiona.green@example.com',
    name: 'Fiona Green',
    password: 'garden789',
  },
  {
    email: 'george.miller@example.com',
    name: 'George Miller',
    password: 'filmmaker1',
  },
  {
    email: 'helen.troy@example.com',
    name: 'Helen Troy',
    password: 'ancient123',
  },
  {
    email: 'ian.malcolm@example.com',
    name: 'Ian Malcolm',
    password: 'chaos123',
  },
  {
    email: 'julia.roberts@example.com',
    name: 'Julia Roberts',
    password: 'pretty123',
  },
  {
    email: 'kevin.hart@example.com',
    name: 'Kevin Hart',
    password: 'comedy456',
  },
  {
    email: 'laura.palmer@example.com',
    name: 'Laura Palmer',
    password: 'peaks789',
  },
  {
    email: 'michael.scott@example.com',
    name: 'Michael Scott',
    password: 'thats789',
  },
  {
    email: 'nina.simone@example.com',
    name: 'Nina Simone',
    password: 'feeling123',
  },
  {
    email: 'oscar.wilde@example.com',
    name: 'Oscar Wilde',
    password: 'picture123',
  },
];

async function main(): Promise<void> {
  console.log('Start seeding...');

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e: Error): void => {
    console.error(e);
    process.exit(1);
  })
  .finally(async (): Promise<void> => {
    await prisma.$disconnect();
  });
