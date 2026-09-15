import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUsersRepository } from '../../features/users/users.repository.interface.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersRepo: IUsersRepository,
  ) {
    const secret = configService.get('JWT_SECRET');
    if(!secret){
      throw new Error("JWT_SECRET is not set")
    }
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration:false,
      secretOrKey: secret, 
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepo.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }
    return user
  }
}