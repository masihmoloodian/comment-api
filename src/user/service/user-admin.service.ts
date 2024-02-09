import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/user-role.entity';
import { UserRoleEnum } from 'src/auth/enum/user-role.enum';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createAdminUser(email: string) {
    let role = await this.roleRepository.findOne({
      where: {
        name: UserRoleEnum.ADMIN
      }
    })
  
    // Create the role if it doesn't exist
    if (!role) role = await this.roleRepository.save({name: UserRoleEnum.ADMIN});

    try {
      await this.userRepository.save(new UserEntity({
        email,
        roles: [role],
        password: 'changeme'
      }))
    } catch (err) {
      if (err.code === '23505') {
        console.log("Super Admin exists");      
      }
    }  
  }
}
