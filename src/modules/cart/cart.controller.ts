import {
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDB } from '../../common/decorators/param-decorators/user-db.decorator';
import { User } from '@prisma/client';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@UserDB() user: User) {
    return this.cartService.getCart(user);
  }

  @Post(':productId/:quantity')
  addToCart(
    @UserDB() user: User,
    @Param('productIid') productId: string,
    @Param('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(user, productId, quantity);
  }

  @Delete(':productId')
  removeFromCart(@UserDB() user: User, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(user, productId);
  }

  @Patch(':productId/:quantity')
  updateCart(
    @UserDB() user: User,
    @Param('productId') productId: string,
    @Param('quantity') quantity: number,
  ) {
    return this.cartService.updateCart(user, productId, quantity);
  }
}
