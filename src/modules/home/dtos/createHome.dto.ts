// import { PropertyType } from '@prisma/client';
// import { Type } from 'class-transformer';
// import {
//   IsArray,
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsPositive,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
//
// class Image {
//   @IsString()
//   imgUrl: string;
// }
// export class CreateHomeDto {
//   @IsString()
//   @IsNotEmpty()
//   address: string;
//
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   numberOfBedrooms: number;
//
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   numberOfBathrooms: number;
//
//   @IsString()
//   @IsNotEmpty()
//   city: string;
//
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   price: number;
//
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   landSize: number;
//
//   @IsEnum(PropertyType)
//   propertyType: PropertyType;
//
//   //
//   // @Exclude()
//   // realtor_id: number;
//
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => Image)
//   images: Image[];
// }
