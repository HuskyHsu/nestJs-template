import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { User, Article } from '@prisma/client';
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

    console.log('user', user);

    if (user.isAdmin) {
      can(Action.Manage, 'Article');
    } else {
      can(Action.Read, 'Article');
      can(Action.Update, 'Article');
      cannot(Action.Delete, 'Article');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<{
          User: User;
          Article: Article;
        }>,
    });
  }
}
