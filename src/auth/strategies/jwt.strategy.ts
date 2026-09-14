import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../../features/users/users.repository.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersRepo: UsersRepository,
  ) {
    const secret = configService.get('JWT_SECRET');
  console.log('JWT_SECRET:', secret); // временно
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), 
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepo.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }
    const { password, ...result } = user;
    return result;
  }
}