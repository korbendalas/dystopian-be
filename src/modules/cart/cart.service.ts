import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../../common/decorators/public.decorator';

@Injectable()
@Public()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCart(user) {
    const cart = await this.prismaService.cartItem.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        Product: true,
      },
    });
    console.log(' get cart', cart);
    return cart;
  }

  async addToCart(user, product_id, quantity) {
    const cart = await this.prismaService.cartItem.create({
      data: {
        user_id: user.id,
        product_id,
        quantity,
      },
    });
    console.log('add to cart', cart);
    return cart;
  }

  async removeFromCart(user, product_id) {
    const cart = await this.prismaService.cartItem.delete({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id,
        },
      },
    });
    console.log(' remove from cart', cart);
    return cart;
  }

  async updateCart(user, product_id, quantity) {
    const cart = await this.prismaService.cartItem.update({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id,
        },
      },
      data: {
        quantity,
      },
    });
    console.log('update cart', cart);
    return cart;
  }
}
