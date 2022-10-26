import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
      roles: ['admin'],
    },
    {
      userId: 2,
      username: 'maria',
      email: 'maria@gmail.com',
      password: 'changeme',
      roles: ['user'],
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.userId === id);
  }
}
