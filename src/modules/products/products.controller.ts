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
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { Public } from '../../common/decorators/public.decorator';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UseRoles } from 'nest-access-control';
import { RbacPolicy } from '../auth/rbac-policy';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

export type ProductsPaginated = {
  productsList: Product[];
  totalCount: number;
};
@ApiTags('Products')
@UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiQuery({ name: 'limit', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: true, type: Number, example: 1 })
  // @ApiCreatedResponse({ type: ProductsPaginated })
  @CacheTTL(10)
  @Public()
  @CacheKey('all-products')
  @Get()
  async getProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ): Promise<ProductsPaginated> {
    return this.productService.getProducts(limit, offset);
  }

  @ApiQuery({ name: 'limit', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'offset', required: true, type: Number, example: 1 })
  @Get('featured')
  @Public()
  async getFeaturedProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ) {
    return this.productService.getFeaturedProducts(limit, offset);
  }

  // @Public()
  // @Get(':id')
  // async getProductById(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.productService.getProductById(id);
  // }

  @Public()
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

  @UseRoles({
    resource: RbacPolicy.PRODUCTS,
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }
}
