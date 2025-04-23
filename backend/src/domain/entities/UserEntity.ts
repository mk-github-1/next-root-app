/**
 * User: ユーザー
 *
 */
import {
  Entity,
  PrimaryColumn,
  // PrimaryGeneratedColumn,
  Column,
  // DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToOne,
  // ManyToOne,
  // OneToMany,
  // JoinColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  // class-transformerを利用しているのでconstructorは省略
  // TypeScriptではconstructorは自動生成されない

  /*
  constructor(data: { account: string; ... }) {
    this.account = data ? data.account : "";
  }
   */

  @PrimaryColumn({ name: "account", length: 256 })
  public account: string = "";

  @Column({ name: "username", length: 256 })
  public username: string = "";

  @Column({ name: "password", length: 256 })
  public password: string = "";

  // アカウントが有効かどうかを示すフラグ
  @Column({ name: "enabled" })
  public enabled: boolean = false;

  // アカウントの有効期限が切れているかどうかを示すフラグ
  @Column({ name: "account_non_expired" })
  public accountNonExpired: boolean = false;

  // 資格情報の有効期限が切れているかどうかを示すフラグ
  @Column({ name: "account_non_locked" })
  public accountNonLocked: boolean = false;

  // アカウントがロックされているかどうかを示すフラグ
  @Column({ name: "credentials_non_eExpired" })
  public credentialsNonExpired: boolean = false;

  @Column({ name: "sord_order", unsigned: true, default: () => 0 })
  public sortOrder: number = 0;

  @Column({ name: "is_deleted", default: () => false })
  public isDeleted: boolean = false;

  @CreateDateColumn({ name: "created_at", nullable: true })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  public updatedAt?: Date;

  @Column({ name: "created_by_id", nullable: true })
  public createdById?: string;

  @Column({ name: "updated_by_id", nullable: true })
  public updatedById?: string;

  // ユーザーが持つ権限のリスト
  /*
  @OneToMany(() => LoginUserRoleEntity, (loginUserRoleEntity) => loginUserRoleEntity.loginUserEntity, {
    createForeignKeyConstraints: false,
    persistence: false
    // cascade: true,
    // eager: true,
    // onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'account',
    referencedColumnName: 'account'
  })
  public loginUserRoleEntities: LoginUserRoleEntity[]
   */
}
