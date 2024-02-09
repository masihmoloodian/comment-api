import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RequestForgetPassDto {
  @ApiProperty({
    example: 'masihmoloodian@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  readonly email: string;
}

export class ForgetPassDto {
  @ApiProperty({
    example: 'masihmoloodian@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'New Password',
  })
  @IsString()
  @Length(3, 20)
  readonly password: string;

  @ApiProperty({
    description: 'code',
  })
  @IsString()
  readonly code: string;
}
