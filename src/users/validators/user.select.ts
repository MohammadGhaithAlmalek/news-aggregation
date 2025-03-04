import { Prisma } from '@prisma/client';
export function userSelectValidator() {
  return Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    password: true,
    createdAt: true,
    preferredSources: true,
  });
}
