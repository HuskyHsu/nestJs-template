import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, CaslAbilityFactory],
  imports: [PrismaModule],
})
export class ArticlesModule {}
