import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersRepository } from '../../features/users/users.repository.js';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private usersRepo: UsersRepository){
        super({
            usernameField:'login',
            passwordField:'password',
        })
    }
    async validate(login: string, password:string){
        const user = await this.usersRepo.findByLoginWithPassword(login);
        if(!user){
            throw new UnauthorizedException('Invalid data')
        }
        const isPasswordValid = await bcrypt.compare(password,user.password) 

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid data')
        }
        return user;
    }
}