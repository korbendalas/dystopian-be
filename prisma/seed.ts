import { PrismaClient, PropertyType } from '@prisma/client';
import {
  rand,
  randAddress,
  randBetweenDate,
  randCity,
  randFloat,
  randNumber,
  randPhoneNumber,
  randUser,
} from '@ngneat/falso';

const prisma = new PrismaClient();

async function seed() {
  // Generate mock data for users
  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = {
      name: randUser().firstName,
      telephone: randPhoneNumber(),
      email: 'testuser' + i + '@example.com',
      password: 'test@123',
      user_type: rand(['BUYER', 'REALTOR', 'ADMIN']),
    };

    users.push(user);
  }

  // Generate mock data for homes
  const homes = [];
  for (let i = 0; i < 20; i++) {
    const home = {
      address: randAddress().street,
      number_of_bedrooms: randNumber({ min: 1, max: 5 }),
      number_of_bathrooms: randNumber({ min: 1, max: 3 }),
      city: randCity(),
      listed_date: randBetweenDate({
        from: new Date(2022, 0, 1),
        to: new Date(),
      }),
      price: randFloat({ min: 100000, max: 1000000, precision: 2 }),
      land_size: randFloat({ min: 500, max: 2000, precision: 2 }),
      propertyType: rand([PropertyType.RESIDENTAL, PropertyType.CONDO]),
      realtor_id: randNumber({ min: 1, max: users.length }),
    };
    homes.push(home);
  }

  // Generate mock data for images
  const images = [];
  for (let i = 0; i < 50; i++) {
    const image = {
      imgUrl: `https://example.com/image-${i}.jpg`,
      home_id: randNumber({ min: 1, max: homes.length }),
    };
    images.push(image);
  }

  try {
    const createdUsers = await prisma.user.createMany({
      data: users,
    });

    const createdHomes = await prisma.home.createMany({ data: homes });
    const createdImages = await prisma.image.createMany({ data: images });
    console.log('Mock data seeded successfully:');
  } catch (error) {
    console.error('Error seeding mock data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
