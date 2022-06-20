import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of user' })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  readonly pass: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
