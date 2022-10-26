import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RolesService } from './roles.service';

@Module({
  imports: [UsersModule],
  providers: [RolesService],
})
export class RolesModule {}
