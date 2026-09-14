import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../features/users/dto/create-user.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService:AuthService){}
    @Post('register')
    async register(@Body() CreateUserDto:CreateUserDto){
        this.AuthService.register(CreateUserDto)
    }
    
}
