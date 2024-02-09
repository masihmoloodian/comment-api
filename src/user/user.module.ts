import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdminController } from './controller/user-admin.controller';
import { UserAdminService } from './service/user-admin.service';
import { RoleEntity } from './entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [UserController, UserAdminController],
  providers: [UserService, UserAdminService],
  exports: [UserService],
})
export class UserModule {}
