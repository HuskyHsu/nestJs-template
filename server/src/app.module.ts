import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [PrismaModule, ArticlesModule, AuthModule, UsersModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, RolesService],
})
export class AppModule {}
