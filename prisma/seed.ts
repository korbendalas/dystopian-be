import { PrismaClient, UserType } from '@prisma/client';

import {
  rand,
  randAddress,
  randBetweenDate,
  randCity,
  randFloat,
  randNumber,
  randPhoneNumber,
  randProductDescription,
  randProductName,
  randTextRange,
  randUser,
} from '@ngneat/falso';
import { addDays, addMonths, addYears, format, toDate } from 'date-fns';
import { categoriesData } from './mockData/categories.mockdata';
import { brandsData } from './mockData/brands.mockData';
import * as bcrypt from 'bcryptjs';
import * as process from 'process';

const prisma = new PrismaClient();

async function seed() {
  // Generate mock data for users

  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = {
      firstName: randUser().firstName,
      lastName: randUser().lastName,
      username: randUser().username,
      telephone: randPhoneNumber(),
      email: 'testuser' + i + '@example.com',
      password: await bcrypt.hash(
        'test@123',
        Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
      ),
      user_type: rand([UserType.REGULAR, UserType.ADMIN]),
    };

    users.push(user);
  }

  //create seed function for categories using the following schema model in prisma.schema and categoriesData array
  //refactor it to use the categoriesData array with map function
  const categories = categoriesData.map((category) => {
    return {
      name: category.name,
      parentId: category.parentId,
    };
  });

  //create seed function for brands using the following schema model in prisma.schema and brandsData array using map function
  //refactor it to use the brandsData array with map function

  const brands = brandsData.map((brand) => {
    return {
      name: brand.name,
    };
  });

  try {
    const createdUsers = await prisma.users.createMany({
      data: users,
    });
    console.log('createdUsers successfully:', createdUsers);

    if (createdUsers) {
      const getUsers = await prisma.users.findMany();
      console.log('getUsers successfully:', getUsers);
      const userImages = getUsers.map((user) => {
        return {
          imgUrl: `https://example.com/image-${user.id}.jpg`,
          user_id: user.id,
        };
      });

      const createdUserImages = await prisma.userAvatars.createMany({
        data: userImages,
      });
      console.log('createdUserImages successfully:');
    }

    const createdCategories = await prisma.category.createMany({
      data: categories,
    });
    console.log('createdCategories successfully:', createdCategories);

    const createdBrands = await prisma.brands.createMany({ data: brands });
    console.log('createdBrands successfully:', createdBrands);

    const products = [];
    if (createdCategories && createdBrands) {
      const getCategories = await prisma.category.findMany();
      const getBrands = await prisma.brands.findMany();

      for (let i = 0; i < 250; i++) {
        const product = {
          title: randProductName(),
          price: randNumber({ min: 100, max: 1000 }),
          discountPrice: rand([null, randNumber({ min: 100, max: 1000 })]),
          quantity: randNumber({ min: 1, max: 200 }),
          sold: randNumber({ min: 1, max: 100 }),
          brand_id: rand([...getBrands.map((b) => b.id)]),
          smallDescription: randTextRange({ min: 50, max: 100 }),
          largeDescription: randTextRange({ min: 200, max: 1000 }),
          specification: randProductDescription(),
          categoryId: rand([...getCategories.map((c) => c.id)]),
        };
        products.push(product);
      }
      const createdProducts = await prisma.products.createMany({
        data: products,
      });
      console.log('createdProducts successfully:', createdProducts);

      const getUsers = await prisma.users.findMany();

      const featuredProducts = [];
      const specialOffers = [];
      const productImages = [];

      if (createdProducts) {
        const getProducts = await prisma.products.findMany();
        for (let i = 0; i < 20; i++) {
          const featuredProduct = {
            product_id: rand([...getProducts.map((p) => p.id)]),
          };
          featuredProducts.push(featuredProduct);
        }

        for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < 4; j++) {
            const productImage = {
              imgUrl: `https://picsum.photos/id/${i}/200/300`,
              product_id: rand([...getProducts.map((p) => p.id)]),
              user_id: rand([...getUsers.map((u) => u.id)]),
            };
            productImages.push(productImage);
          }
        }

        for (let i = 0; i < 20; i++) {
          const specialOffer = {
            product_id: rand([...getProducts.map((p) => p.id)]),
            starts_at: toDate(new Date()),
            // end date is between 3 and 6 days from now
            ends_at: addDays(new Date(), randNumber({ min: 3, max: 6 })),
          };
          specialOffers.push(specialOffer);
        }
      }

      const createdFeaturedProducts = await prisma.featuredProducts.createMany({
        data: featuredProducts,
      });

      console.log(
        'createdFeaturedProducts successfully:',
        createdFeaturedProducts,
      );

      const createdProductImages = await prisma.productImages.createMany({
        data: productImages,
      });
      console.log('createdProductImages successfully:', createdProductImages);

      const createdSpecialOffers = await prisma.specialOffers.createMany({
        data: specialOffers,
      });
      console.log('createdSpecialOffers successfully:', createdSpecialOffers);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding mock data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
