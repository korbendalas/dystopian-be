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
import { Products } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

export type ProductsPaginated = {
  productsList: Products[];
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
    return await this.productService.getProducts(limit, offset);
  }
  @Get('featured')
  async getFeaturedProducts(
    @Query('limit', new ParseIntPipe()) limit = 20,
    @Query('offset', new ParseIntPipe()) offset = 1,
  ) {
    return await this.productService.getFeaturedProducts(limit, offset);
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.productService.getProductById(id);
  }
  @Get(':uuid')
  async getProductByUUID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.productService.getProductByUuid(uuid);
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
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.deleteProduct(id);
  }
}
