import { Module } from '@nestjs/common';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, BcryptService],
  exports: [UsersService],
  imports: [PrismaModule],
  controllers: [UsersController],
})
export class UsersModule {}
