import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomeResponseDto } from './dtos/homeResponse.dto';
import { PropertyType } from '@prisma/client';
interface GetHomesFilterParam {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };

  propertyType?: PropertyType;
}

const homeSelect = {
  id: true,
  address: true,
  city: true,
  price: true,
  propertyType: true,
  created_at: true,
  updated_at: true,
  number_of_bedrooms: true,
  number_of_bathrooms: true,
  listed_date: true,
  land_size: true,
};

const imageSelect = {
  id: true,
  imgUrl: true,
};
@Injectable()
export class HomeService {
  constructor(private prismaService: PrismaService) {}

  async getHomes(filters: GetHomesFilterParam): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: {
        ...homeSelect,
        images: {
          select: imageSelect,
          take: 2,
        },

        realtor: true,
      },
      where: filters,
    });

    if (!homes.length) throw new NotFoundException();

    return homes.map((home) => new HomeResponseDto(home));
  }

  // getHomeById method with the realtor selection
  async getHomeById(id: number): Promise<HomeResponseDto> {
    const home = await this.prismaService.home.findUnique({
      where: { id },
      select: {
        ...homeSelect,
        images: {
          select: imageSelect,
          take: 2,
        },
        realtor: {
          // the realtor this is added
          select: {
            name: true,
            email: true,
            telephone: true,
          },
        },
      },
    });

    if (!home) {
      throw new NotFoundException();
    }

    return new HomeResponseDto(home);
  }
}
