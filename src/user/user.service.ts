import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, email: 'email1@email.com', name: 'email1' },
    { id: 2, email: 'email2@email.com', name: 'email2' },
  ];
  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
