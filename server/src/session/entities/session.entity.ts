import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  secret: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
