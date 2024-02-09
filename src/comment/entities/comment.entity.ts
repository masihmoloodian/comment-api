import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { ParentEntity } from "src/shared/entities/parent.entity";
import { CommentStatusEnum } from "../enum/comment-status.enum";

@Entity('comments')
export class CommentEntity extends ParentEntity {
  constructor(entity?: Partial<CommentEntity>) {
    super();
    this.setArgumentToThisObject(entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({ default: CommentStatusEnum.PENDING })
  status: string

  @Column({name: 'user_id'})
  userId: string;
  
  // ---------- Relations ----------
  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: CommentEntity | null;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string | null;

  @OneToMany(() => CommentEntity, (comment) => comment.parent, { cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
  children: CommentEntity[];
}
