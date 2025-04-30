import { HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { JwtPayload, RequestWithUser } from "src/helpers/jwt/jwt.type";
import { CreateBlogDto, FindBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
export declare class BlogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBlogDto, req: RequestWithUser): Promise<{
        code: HttpStatus;
        success: boolean;
        message: string;
        data: {
            id: number;
            uuid: string;
            userId: number;
            titles: string;
            content: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(dto: FindBlogDto, user: JwtPayload): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
    }[]>>;
    findOne(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
    }>>;
    update(uuid: string, dto: UpdateBlogDto): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        userId: number;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>>;
    remove(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        userId: number;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>>;
}
