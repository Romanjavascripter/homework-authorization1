import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity.js";
import { IUsersRepository } from "./users.repository.interface.js";
import { UsersRepository } from "./users.repository.js";

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    providers : [
        {
            provide:IUsersRepository,
            useClass:UsersRepository
        }
    ],
    exports : [IUsersRepository],
})

export class UsersModule {}