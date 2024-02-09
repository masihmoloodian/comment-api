import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentStatusEnum } from '../enum/comment-status.enum';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async addComment(userId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const comment = new CommentEntity();
    comment.content = dto.content;
    comment.userId = userId;
    
    if (dto.parentId) {
      const parent = await this.commentRepository.findOneBy({ id: dto.parentId });
      if (!parent) throw new NotFoundException('Parent comment not found');
      comment.parent = parent;
    }
    return this.commentRepository.save(comment);
  }

  async getAllUserComments(userId: string): Promise<CommentEntity[]> {
    return this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select(['comment', 'user.email']) 
      .leftJoinAndSelect('comment.children', 'children')
      .where('comment.userId = :userId', { userId })
      .getMany();
  }
  
  async getAllApprovedComments(): Promise<CommentEntity[]> {
    return this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select(['comment', 'user.email']) 
      .leftJoinAndSelect('comment.children', 'children')
      .where('comment.status = :status', { status: CommentStatusEnum.APPROVED })
      .getMany();
  }

  async deleteComment(userId: string, commentId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, userId },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    
    await this.commentRepository.remove(comment);
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) throw new NotFoundException(`Comment with ID "${commentId}" not found.`);

    const updatedComment = this.commentRepository.merge(comment, updateCommentDto);
    updatedComment.status = CommentStatusEnum.PENDING
    return this.commentRepository.save(updatedComment);
  }
}
