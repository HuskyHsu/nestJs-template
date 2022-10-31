import { Injectable } from '@nestjs/common';
import { User, Article } from '@prisma/client';
import { PureAbility, AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Action } from 'src/enums/action.enum';

export type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Article: Article;
    }>,
  ],
  PrismaQuery
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'Article');
    } else {
      can(Action.Read, 'Article');
    }

    can(Action.Update, 'Article', { authorId: user.id });
    cannot(Action.Delete, 'Article', { authorId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<{
          User: User;
          Article: Article;
        }>,
    });
  }
}
