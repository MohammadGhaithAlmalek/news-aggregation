export class UserEntity {
  id: number;
  email: string;
  createdAt: Date;
  preferredSources: string[];
  password: string;

  constructor(user: {
    id: number;
    email: string;
    createdAt: Date;
    preferredSources: string[];
    password: string;
  }) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.preferredSources = user.preferredSources;
    this.password = user.password;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      preferredSources: this.preferredSources,
    };
  }
}
