import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/database/prisma.service";
import { ApiResponse } from "src/helpers/api-response.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/helpers/jwt/jwt.type";
export declare class UserService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    create(dto: CreateUserDto): Promise<ApiResponse<{
        access_token: string;
    }>>;
    findAll(user: JwtPayload): Promise<ApiResponse<{
        id: number;
        uuid: string;
        userName: string;
        createdAt: Date;
        updatedAt: Date;
        blog: {
            id: number;
            uuid: string;
            createdAt: Date;
            titles: string;
            content: string;
            status: string;
        }[];
    } | null>>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
