import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ValidationPipe, Patch, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';
import { User } from 'src/shared/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CommentService } from '../service/comment.service';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { isValidUUID } from 'src/shared/tools/is-uuid.rool';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new comment, parentId is Optional' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: CommentEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async addComment(@User() user: UserEntity, @Body() dto: CreateCommentDto) {
    return this.commentService.addComment(user.id, dto);
  }

  @Get('user')
  @ApiOperation({ summary: "User get owned comments" })
  @ApiResponse({ status: 200, description: 'User get owned comments.', type: [CommentEntity] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllUserComments (@User() user: UserEntity) {
    return this.commentService.getAllUserComments(user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all approved comments' })
  @ApiResponse({ status: 200, description: 'Return all approved comments.', type: [CommentEntity] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllApprovedComments() {
    return this.commentService.getAllApprovedComments();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteComment(@User() user: UserEntity, @Param('id') id: string) {
    isValidUUID(id)
    return this.commentService.deleteComment(user.id, id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    isValidUUID(id)
    return this.commentService.updateComment(id, updateCommentDto);
  }
}
