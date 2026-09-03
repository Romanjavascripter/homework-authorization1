import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, length: 50 })
  login: string;
  @Column({ unique: true, length: 50 })
  email: string;
  @Column({ length: 60, select: false })
  password: string;
  @Column({ type: 'int' })
  age: number;
  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
