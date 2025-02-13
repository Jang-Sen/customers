import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @ApiProperty({
    example: '오장원',
    description: '고객 이름',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'dh789521@gmail.com',
    description: '고객 이메일',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '010-9511-0662',
    description: '고객 연락처',
  })
  phone: string;
}
