// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create a new user
  const user1 = await prisma.user.upsert({
    where: { email: 'john@gmail.com' },
    update: {},
    create: {
      username: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
      isAdmin: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@gmail.com' },
    update: {},
    create: {
      username: 'maria',
      email: 'maria@gmail.com',
      password: 'changeme',
      isAdmin: false,
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      author: { connect: { id: user1.id } },
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      author: { connect: { id: user2.id } },
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
