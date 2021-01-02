import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BcryptUtil } from './bcrypt-utils';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ name: 'eletronic_signature' })
  eletronicSignature!: string;

  @Column()
  name!: string;

  @Column()
  permission!: string;

  @Column({ name: 'last_access' })
  lastAccess!: Date;

  @Column()
  balance!: number;

  @Column()
  pixKey!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatadAt!: Date;

  async validatePassword(textPassword: string): Promise<boolean> {
    return BcryptUtil.init().comparePassword(textPassword, this.password);
  }

  async encriptPassword(textPassword: string): Promise<void> {
    this.password = await BcryptUtil.init().encriptPassword(textPassword);
  }
}
