import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProducts(limit: number, offset: number) {
    return await this.prismaService.$transaction(async (prisma) => {
      const productsList = await prisma.products.findMany({
        skip: (offset - 1) * limit, // Calculate the number of items to skip based on the page and page size
        take: limit, // Define the maximum number of items to fetch per page
      });

      const totalCount = await prisma.products.count();

      return { productsList, totalCount };
    });
  }

  async getProduct(id: number) {
    return await this.prismaService.products.findUnique({ where: { id } });
  }
  async createProduct() {
    return 'This action adds a new product';
  }
  async updateProduct() {
    return 'This action updates a product';
  }
  async deleteProduct() {
    return 'This action removes a product';
  }
}
