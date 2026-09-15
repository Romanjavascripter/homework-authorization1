import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../features/users/dto/create-user.dto.js';
import { LocalAuthGuard } from './strategies/local-auth.guard.js';
import { User } from '../features/users/entity/user.entity.js';
import { JwtRefreshGuard } from './strategies/jwt-refresh.guard.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService:AuthService){}
    @Post('register')
    async register(@Body() dto:CreateUserDto){
        return this.AuthService.register(dto)
    }
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Request() req:{user:User}) {
        return this.AuthService.login(req.user)
    }
    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async refresh(@Request() req:{user:User}){
        return this.AuthService.refresh(req.user)
    }
}
