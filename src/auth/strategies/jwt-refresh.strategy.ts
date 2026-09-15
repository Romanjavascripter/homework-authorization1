import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUsersRepository } from "../../features/users/users.repository.interface.js";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,"jwt-refresh"){
    constructor(
        private configService:ConfigService,
        private userRepo:IUsersRepository
    ){
        const secret = configService.get("JWT_REFRESH_SECRET")
        if(!secret){
            throw new Error("REFRESH is not set")
        }
        super({
            jwtFromRequest:ExtractJwt.fromBodyField('refresh_token'),
            ignoreExpiration:false,
            secretOrKey:secret
        })
    }

    async validate(payload:any){
        const user = await this.userRepo.findById(payload.sub)
        if(!user){
            throw new UnauthorizedException ("Invalid data")
        }
        return user
    }
}