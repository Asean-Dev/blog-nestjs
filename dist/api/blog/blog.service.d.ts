import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtPayload, RequestWithUser } from 'src/helpers/jwt/jwt.type';
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
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            titles: string;
            content: string;
            status: import(".prisma/client").$Enums.BlogStatus;
        };
    }>;
    findAll(user: JwtPayload): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }[]>>;
    findOne(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }>>;
    update(uuid: string, dto: UpdateBlogDto): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }>>;
    remove(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }>>;
}
