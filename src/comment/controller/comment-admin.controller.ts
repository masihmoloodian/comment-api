import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CommentEntity } from '../entities/comment.entity';
import { CommentAdminService } from '../service/comment-admin.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { isValidUUID } from 'src/shared/tools/is-uuid.rool';

@ApiTags("Comment Admin")
@Controller('admin/comment')
export class CommentAdminController {
    constructor(private readonly commentService: CommentAdminService) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all comments' })
    @ApiResponse({ status: 200, description: 'Return comments.', type: [CommentEntity] })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getAllComments() {
      return this.commentService.getAllComments();
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles('admin')
    async deleteComment(@Param('id') id: string) {
      isValidUUID(id)
      return this.commentService.deleteComment(id);
    }

    @Put(':id/approve')
    @ApiOperation({ summary: 'Approve a comment' })
    @ApiResponse({ status: 204, description: 'The comment has been successfully approved.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles('admin')
    async approveComment(@Param('id') id: string) {
      isValidUUID(id)
      return this.commentService.approveComment(id);
    }
}
