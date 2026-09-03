import { User } from './entity/user.entity.js';

export abstract class IUsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByLogin(login: string): Promise<User | null>;
  abstract findByLoginWithPassword(login:string):Promise<User | null>
  abstract create(data: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract findAll(params: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ items: User[]; total: number }>;
}
