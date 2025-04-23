/*
 * UserDTO
 * DTO定義時、必須でないプロパティはオプショナル"?"、インターセクト型 | nullが両方必要
 * | null時は初期化しない
 */
export class UserDto {
  account: string = "";
  username?: string | null;
  password?: string | null;
  enabled?: boolean | null;
  accountNonExpired?: boolean | null;
  accountNonLocked?: boolean | null;
  credentialsNonExpired?: boolean | null;
  sortOrder?: number | null;
  isDeleted?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
