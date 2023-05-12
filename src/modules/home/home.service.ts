// import { Injectable, NotFoundException } from '@nestjs/common';
// // import { PrismaService } from '../prisma/prisma.service';
// import { HomeResponseDto } from './dtos/homeResponse.dto';
// import { PropertyType } from '@prisma/client';
// import { CreateHomeDto } from './dtos/createHome.dto';
// import { UpdateHomeDto } from './dtos/updateHome.dto';
// import { UserDecoratorInterface } from '../user/decorators/user.decorator';
// interface GetHomesFilterParam {
//   city?: string;
//   price?: {
//     gte?: number;
//     lte?: number;
//   };
//
//   propertyType?: PropertyType;
// }
//
// const homeSelect = {
//   id: true,
//   address: true,
//   city: true,
//   price: true,
//   propertyType: true,
//   created_at: true,
//   updated_at: true,
//   number_of_bedrooms: true,
//   number_of_bathrooms: true,
//   listed_date: true,
//   land_size: true,
// };
//
// const imageSelect = {
//   id: true,
//   imgUrl: true,
// };
// const realtorSelect = {
//   id: true,
//   name: true,
//   email: true,
//   telephone: true,
// };
// @Injectable()
// export class HomeService {
//   // constructor(private prismaService: PrismaService) {}
//
//   async getHomes(filters: GetHomesFilterParam): Promise<HomeResponseDto[]> {
//     const homes = await this.prismaService.home.findMany({
//       select: {
//         ...homeSelect,
//         images: {
//           select: imageSelect,
//           take: 2,
//         },
//
//         realtor: { select: realtorSelect },
//       },
//       where: filters,
//     });
//
//     if (!homes.length) throw new NotFoundException();
//
//     return homes.map((home) => new HomeResponseDto(home));
//   }
//
//   // getHomeById method with the realtor selection
//   async getHomeById(id: number): Promise<HomeResponseDto> {
//     const home = await this.prismaService.home.findUnique({
//       where: { id },
//       select: {
//         ...homeSelect,
//         images: {
//           select: imageSelect,
//           take: 2,
//         },
//         realtor: {
//           // the realtor this is added
//           select: realtorSelect,
//         },
//       },
//     });
//
//     if (!home) {
//       throw new NotFoundException();
//     }
//
//     return new HomeResponseDto(home);
//   }
//
//   async createHome(
//     {
//       address,
//       numberOfBathrooms,
//       numberOfBedrooms,
//       price,
//       propertyType,
//       city,
//       landSize,
//       images,
//     }: CreateHomeDto,
//     user: UserDecoratorInterface,
//   ): Promise<HomeResponseDto> {
//     const home = await this.prismaService.home.create({
//       data: {
//         address,
//         price,
//         city,
//         number_of_bathrooms: numberOfBathrooms,
//         number_of_bedrooms: numberOfBedrooms,
//         propertyType,
//         land_size: landSize,
//         realtor_id: user.id, // TODO update realtor id
//       },
//     });
//
//     const homeImages = images.map((image) => {
//       return { ...image, home_id: home.id };
//     });
//     await this.prismaService.image.createMany({ data: homeImages });
//
//     return new HomeResponseDto(home);
//   }
//
//   async updateHome({
//     id,
//     body,
//   }: {
//     id: number;
//     body: UpdateHomeDto;
//   }): Promise<HomeResponseDto> {
//     await this.getHomeById(id);
//
//     const updatedHome = await this.prismaService.home.update({
//       where: { id },
//       data: body,
//     });
//     return new HomeResponseDto(updatedHome);
//   }
//
//   async deleteHome(id: number) {
//     await this.getHomeById(id);
//
//     return this.prismaService.home.delete({ where: { id } });
//   }
//
//   async getRealtorByHomeId(id: number) {
//     const home = await this.prismaService.home.findUnique({
//       where: { id },
//       select: {
//         realtor: {
//           select: realtorSelect,
//         },
//       },
//     });
//
//     if (!home) throw new NotFoundException();
//
//     return home.realtor;
//   }
// }
