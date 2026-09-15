import { Controller, Get,  Request, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/strategies/jwt-auth.guard.js";
import { User } from "./entity/user.entity.js";

@Controller("profile")
export class ProfileController{
    @UseGuards(JwtAuthGuard)
    @Get('my')
    async myProfile(@Request()req:{user:User}){
    return req.user
}
}