// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   Post,
//   Put,
//   Query,
//   UnauthorizedException,
//   UseGuards,
// } from '@nestjs/common';
// import { HomeService } from './home.service';
// import { HomeResponseDto } from './dtos/homeResponse.dto';
// import { PropertyType, UserType } from '@prisma/client';
// import { CreateHomeDto } from './dtos/createHome.dto';
// import { UpdateHomeDto } from './dtos/updateHome.dto';
// import {
//   User,
//   UserDecoratorInterface,
// } from '../user/decorators/user.decorator';
// import { AuthGuard } from '../guards/auth.guard';
// import { Roles } from '../user/decorators/roles.decorator';
//
// @Controller('home')
// export class HomeController {
//   constructor(private readonly homeService: HomeService) {}
//   @Get()
//   getHomes(
//     @Query('city') city?: string,
//     @Query('minPrice') minPrice?: string,
//     @Query('maxPrice') maxPrice?: string,
//     @Query('propertyType') propertyType?: PropertyType,
//   ): Promise<HomeResponseDto[]> {
//     const price =
//       minPrice || maxPrice
//         ? {
//             ...(minPrice && { gte: parseFloat(minPrice) }),
//             ...(maxPrice && { lte: parseFloat(maxPrice) }),
//           }
//         : undefined;
//
//     const filters = {
//       ...(city && { city }),
//       ...(price && { price }),
//       ...(propertyType && { propertyType }),
//     };
//
//     return this.homeService.getHomes(filters);
//   }
//
//   @Get(':id')
//   getHome(@Param('id', ParseIntPipe) id: number) {
//     return this.homeService.getHomeById(id);
//   }
//
//   @Roles(UserType.REALTOR, UserType.ADMIN)
//   @Post()
//   createHome(
//     @Body() body: CreateHomeDto,
//     @User() user: UserDecoratorInterface,
//   ) {
//     return this.homeService.createHome(body, user);
//   }
//
//   @Roles(UserType.REALTOR, UserType.ADMIN)
//   @Put(':id')
//   async updateHome(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() body: UpdateHomeDto,
//     @User() user: UserDecoratorInterface,
//   ) {
//     const realtor = await this.homeService.getRealtorByHomeId(id);
//
//     if (realtor.id !== user.id) throw new UnauthorizedException();
//     return this.homeService.updateHome({ id, body });
//   }
//
//   @Roles(UserType.REALTOR, UserType.ADMIN)
//   @Delete(':id')
//   async deleteHome(
//     @Param('id', ParseIntPipe) id: number,
//     @User() user: UserDecoratorInterface,
//   ) {
//     const realtor = await this.homeService.getRealtorByHomeId(id);
//
//     if (realtor.id !== user.id) throw new UnauthorizedException();
//     return this.homeService.deleteHome(id);
//   }
// }
