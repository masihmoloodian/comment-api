import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/service/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: UserAuthDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  async create(@Body() dto: UserAuthDto) {
    return this.authService.signIn(dto);
  }
}
