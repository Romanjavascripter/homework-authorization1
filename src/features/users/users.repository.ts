import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "./users.repository.interface.js";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { User } from "./entity/user.entity.js";


@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ){}

    async findById(id:string):Promise<User | null>{
        return this.repo.findOne({where:{id}})
    }

    async findByLogin(login:string):Promise<User | null>{
        return this.repo.findOne({where:{login}})
    }

    async findByEmail(email:string):Promise<User | null>{
        return this.repo.findOne({where:{email}})
    }

    async findByLoginWithPassword(login:string): Promise<User | null>{
        return this.repo.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.login=:login', {login})
        .getOne();
    }

    async create(data:Partial<User>):Promise<User>{
        const user = this.repo.create(data)
        return this.repo.save(user)
    }

    async delete(id:string): Promise<void>{
        await this.repo.delete(id)
    }
    
    async update(id:string,data:Partial<User>): Promise<User>{
        await this.repo.update(id, data)
        const user = await this.findById(id)
        if(!user){
            throw new Error ("User not found")
        }
        return user;
    }

    async findAll(params: { page: number; limit: number; search?: string; }): Promise<{ items: User[]; total: number; }> {
        const {page, limit, search} = params
        const [items, total] = await this.repo.findAndCount({
            where: search ? { login: ILike(`%${search}%`)}:{},
            skip: (page-1)*limit,
            take:limit,
            order: { createdAt:'DESC'}
        })
        return {items, total}
    }

}