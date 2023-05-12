// import { PrismaClient, PropertyType, UserType } from '@prisma/client';
// import { faker } from '@faker-js/faker';
// import * as bcrypt from 'bcryptjs';
// import { random, sample } from 'lodash';
//
// const createBuyerUser = async (
//   index: number,
//   userType: UserType = UserType.BUYER,
// ) => {
//   const name = 'testuser' + index + 1;
//   const password = await bcrypt.hash('test@123', 10);
//   return {
//     name: name,
//     email: `${name}@mail.com`,
//     password: password,
//     telephone: faker.phone.number(),
//     user_type: userType,
//   };
// };
//
// const createHomes = async (realtorId) => {
//   return {
//     address: faker.address.streetAddress(),
//     number_of_bedrooms: Number(faker.random.numeric()),
//     number_of_bathrooms: Number(faker.random.numeric()),
//     city: faker.address.city(),
//     listed_date: faker.date.past(),
//     price: Number(faker.commerce.price()),
//     land_size: Number(faker.random.numeric(100)),
//     propertyType: sample([PropertyType.CONDO, PropertyType.RESIDENTAL]),
//     // images              Image[]
//     realtor_id: realtorId,
//   };
// };
//
// const createImages = async (homeId) => {
//   return {
//     imgUrl: faker.image.city(),
//     home_id: homeId,
//   };
// };
//
// const prisma = new PrismaClient();
//
// // The transaction runs synchronously so deleteUsers must run last.
//
// async function main() {
//   // await prisma.$queryRawUnsafe('DROP schema public CASCADE');
//
//   console.log('Seeding...');
//   /// --------- Users ---------------
//   for (let i = 0; i < 10; i++) {
//     await prisma.user.create({ data: await createBuyerUser(i) });
//   }
//
//   console.log('INSERTING BUYERS.....');
//   // const Buyers = await prisma.user.createMany({
//   //   data: range(10).map((item) => item),
//   // });
//
//   console.log('DONE - INSERTING BUYERS!');
//
//   for (let i = 10; i < 20; i++) {
//     await prisma.user.create({
//       data: await createBuyerUser(i, UserType.REALTOR),
//     });
//   }
//
//   for (let i = 0; i < 50; i++) {
//     const home = await prisma.home.create({
//       // @ts-ignore
//       data: await createHomes(random(1, 6)),
//     });
//
//     for (let j = 0; j < 5; j++) {
//       // @ts-ignore
//       await prisma.image.create({ data: await createImages(home.id) });
//     }
//   }
// }
//
// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     console.log('SEEDING COMPLETE!!');
//     await prisma.$disconnect();
//   });
