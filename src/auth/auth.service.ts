import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: UserAuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const payload = { id: user.id, roles: user.roles };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
