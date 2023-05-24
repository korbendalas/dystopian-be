import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from '@prisma/client';

interface ProductsPaginated {
  productsList: Products[];
  totalCount: number;
}
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ) {
    return await this.productService.getProducts(limit, offset);
  }
  @Get(':id')
  async getProduct(id: number) {
    return await this.productService.getProduct(id);
  }
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Patch(':id')
  updateProduct() {
    return 'This action updates a product';
  }
  @Delete(':id')
  deleteProduct() {
    return 'This action removes a product';
  }
}
