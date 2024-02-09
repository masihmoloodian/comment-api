import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentAdminService } from './service/comment-admin.service';
import { CommentAdminController } from './controller/comment-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  controllers: [CommentController, CommentAdminController],
  providers: [CommentService, CommentAdminService],
})
export class CommentModule {}
