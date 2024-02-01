import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsNumber()
  shirtNumber: number;
}
