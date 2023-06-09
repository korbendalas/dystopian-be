import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

export type ProductsPaginated = {
  productsList: Product[];
  totalCount: number;
};
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiQuery({ name: 'limit', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: true, type: Number, example: 1 })
  // @ApiCreatedResponse({ type: ProductsPaginated })
  @Get()
  async getProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ): Promise<ProductsPaginated> {
    return this.productService.getProducts(limit, offset);
  }
  @Get('featured')
  async getFeaturedProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ) {
    return this.productService.getFeaturedProducts(limit, offset);
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.getProductById(id);
  }
  @Get(':uuid')
  async getProductByUUID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.productService.getProductByUuid(uuid);
  }
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Patch(':id')
  updateProduct() {
    return 'This action updates a product';
  }

  //TODO Add AuthGuard that only ADMINS can delete products
  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }
}
