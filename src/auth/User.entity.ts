import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BcryptUtil } from './bcrypt-utils';
import { userPermission } from './userPermission';
import { format } from 'date-fns';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false, length: 120 })
  email!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  password!: string;

  @Column({ name: 'eletronic_signature', type: 'varchar', nullable: true })
  eletronicSignature!: string;

  @Column({ type: 'varchar', length: 70 })
  name!: string;

  @Column({ type: 'enum', enum: userPermission, default: userPermission.USER })
  permission!: string;

  @Column({
    type: 'datetime',
    name: 'last_access',
    nullable: false,
    default: format(new Date(), 'yyyy-MM-dd H:mm:ss'),
  })
  lastAccess!: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  balance!: number;

  @Column({ type: 'varchar', nullable: true })
  pixKey!: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatadAt!: Date;

  async validatePassword(textPassword: string): Promise<boolean> {
    return BcryptUtil.init().comparePassword(textPassword, this.password);
  }

  @BeforeInsert()
  async encriptPassword(): Promise<void> {
    this.password = await BcryptUtil.init().encriptPassword(this.password);
  }
}
