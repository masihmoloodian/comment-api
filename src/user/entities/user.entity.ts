import { ParentEntity } from 'src/shared/entities/parent.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { RoleEntity } from './user-role.entity';
require('dotenv').config();

@Entity('users')
export class UserEntity extends ParentEntity {
  constructor(entity?: Partial<UserEntity>) {
    super();
    this.setArgumentToThisObject(entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  password: string;

  // ---------- Relations ----------
  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments: CommentEntity[];

  @ManyToMany(() => RoleEntity, role => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, process.env.SALT_HASH);
    }
  }
}
