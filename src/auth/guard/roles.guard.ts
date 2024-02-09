// roles.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { extractTokenFromHeader } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    
    try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('auth.jwtSecret'),
        });

        if (!payload.roles) throw new Error()

        const hasRole = payload.roles.some((role) => requiredRoles.includes(role.name));
        if (!hasRole) throw new Error()
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
}

