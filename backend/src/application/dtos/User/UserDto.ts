// DTO定義時、
// 必須でないプロパティはオプショナル"?"、インターセクト型 | nullが両方必要
export class UserDto {
  account: string = "";
  username: string = "";
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
