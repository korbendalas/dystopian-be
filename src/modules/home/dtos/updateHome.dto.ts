// import { PropertyType } from '@prisma/client';
// import {
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsPositive,
//   IsString,
// } from 'class-validator';
//
// export class UpdateHomeDto {
//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   address?: string;
//
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   numberOfBedrooms?: number;
//
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   numberOfBathrooms?: number;
//
//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   city?: string;
//
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   price?: number;
//
//   @IsOptional()
//   @IsNotEmpty()
//   @IsNumber()
//   @IsPositive()
//   landSize?: number;
//
//   @IsOptional()
//   @IsEnum(PropertyType)
//   propertyType?: PropertyType;
//
//   // Images handled in separate endpoint
// }
