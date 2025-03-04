export class MemberEntity {
  id: number;
  email: string;
  createdAt: Date;
  preferredSources: string[];

  constructor(user: {
    id: number;
    email: string;
    createdAt: Date;
    preferredSources: string[];
  }) {
    this.id = user.id;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.preferredSources = user.preferredSources;
  }
}
