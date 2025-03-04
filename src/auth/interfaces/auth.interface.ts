import { MemberEntity } from '../entities/member.entity';
export interface SignUpReturnType {
  user: MemberEntity;
}
export interface LoginReturnType {
  user: MemberEntity;
  token: string;
}
