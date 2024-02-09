import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApproveCommentDto } from '../dto/approve-comment.dto';
import { CommentEntity } from '../entities/comment.entity';
import { CommentStatusEnum } from '../enum/comment-status.enum';

@Injectable()
export class CommentAdminService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async getAllComments(): Promise<CommentEntity[]> {
        return await this.commentRepository.find();
    }

    async deleteComment(commentId: string): Promise<void> {
        const comment = await this.commentRepository.findOne({
          where: { id: commentId },
        });
        if (!comment) throw new NotFoundException('Comment not found');
        
        await this.commentRepository.remove(comment);
    }

    async approveComment(commentId: string): Promise<CommentEntity> { 
        const comment = await this.commentRepository.findOneBy({ id: commentId });
        if (!comment) throw new NotFoundException('Comment not found');
      
        comment.status = CommentStatusEnum.APPROVED
        return this.commentRepository.save(comment);
    }  
}
