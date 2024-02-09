import { Controller } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { UserAdminService } from '../service/user-admin.service';

@ApiTags('Admin User')
@Controller('admin/user')
export class UserAdminController {
  constructor(private readonly userService: UserAdminService) {}
}
