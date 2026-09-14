import { ConflictException, Injectable, PayloadTooLargeException } from '@nestjs/common';
import { UsersRepository } from '../features/users/users.repository.js';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../features/users/dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';    
import { User } from '../features/users/entity/user.entity.js';

@Injectable()
export class AuthService {
    constructor (
        private usersRepo: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    private generateTokens(user:User){
        const payload = {sub:user.id, login:user.login};
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        })
        return {access_token: accessToken, refresh_token: refreshToken}
        
        }
    
    async register(createUserDto: CreateUserDto){
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        const userData: Partial<User> = {
            login: createUserDto.login,
            email: createUserDto.email,
            password: hashedPassword,
            age: createUserDto.age,
            description: createUserDto.description,
        }

        try {
            const newUser = await this.usersRepo.create(userData);

            const tokens = this.generateTokens(newUser)

            return {
                access_token:tokens.access_token,
                refresh_token: tokens.refresh_token,
                user: newUser,
            }
        }
        catch (error) {
            if(( error as any).code==='23505'){
                throw new ConflictException('User already exists')
            }
            throw error;

        }
    }

    async login(user:User){
        

    }
}
