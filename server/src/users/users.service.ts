import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async registerUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await this.bcryptService.hash(password);
    const dbInsertUserDto: RegisterUserDto = {
      ...userData,
      isAdmin: false,
      hashedPassword,
    };

    try {
      const userCreated = await this.prisma.user.create({
        data: dbInsertUserDto,
      });
      const { hashedPassword, ...result } = userCreated;
      return result;
    } catch (err) {
      console.log('err', err);
      throw err;
    }
  }
}
