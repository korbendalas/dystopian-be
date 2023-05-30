import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProducts(limit: number, offset: number) {
    return this.prismaService.$transaction(async (prisma) => {
      const productsList = await prisma.products.findMany({
        skip: (offset - 1) * limit, // Calculate the number of items to skip based on the page and page size
        take: limit, // Define the maximum number of items to fetch per page
      });

      const totalCount = await prisma.products.count();

      return { productsList, totalCount };
    });
  }

  async getFeaturedProducts(limit: number, offset: number) {
    return this.prismaService.$transaction(async (prisma) => {
      const products = await prisma.featuredProducts.findMany({
        skip: (offset - 1) * limit, // Calculate the number of items to skip based on the page and page size
        take: limit, //
        select: {
          Products: {
            include: {
              Brand: true,
              Category: true,
              ProductImages: true,
            },
          },
        },
      });

      // // Modify the result to use lowercase property names
      const productsList = products.map((featuredProduct) => ({
        id: featuredProduct.Products.id,
        uuid: featuredProduct.Products.uuid,
        title: featuredProduct.Products.title,
        price: featuredProduct.Products.price,
        discountPrice: featuredProduct.Products.discountPrice,
        quantity: featuredProduct.Products.quantity,
        sold: featuredProduct.Products.sold,
        smallDescription: featuredProduct.Products.smallDescription,
        largeDescription: featuredProduct.Products.largeDescription,
        specification: featuredProduct.Products.specification,
        categoryId: featuredProduct.Products.categoryId,
        brand: featuredProduct.Products.Brand,
        category: featuredProduct.Products.Category,
        images: featuredProduct.Products.ProductImages,
      }));

      const totalCount = await prisma.products.count();

      return { productsList, totalCount };
    });
  }

  async getProductByUuid(uuid: string) {
    return this.prismaService.products.findUnique({
      where: { uuid: uuid },
    });
  }
  async getProductById(id: number) {
    return this.prismaService.products.findUnique({
      where: { id },
    });
  }
  async createProduct() {
    return 'This action adds a new product';
  }
  async updateProduct() {
    return 'This action updates a product';
  }

  async deleteProduct(id: number) {
    return this.prismaService.products.delete({
      where: { id },
    });
  }
}
