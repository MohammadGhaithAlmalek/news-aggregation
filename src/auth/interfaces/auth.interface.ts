import { UserEntity } from '../../users/entities/user.entity';

export interface LoginReturnType {
  user: ReturnType<UserEntity['toJSON']>;
  token: string;
}
