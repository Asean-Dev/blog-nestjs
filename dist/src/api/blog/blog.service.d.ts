import { HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { JwtPayload, RequestWithUser } from "src/helpers/jwt/jwt.type";
import { CreateBlogCommentDto, CreateBlogDto, FindBlogDto } from "./dto/create-blog.dto";
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
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            titles: string;
            content: string;
            status: string;
        };
    }>;
    createComment(dto: CreateBlogCommentDto, req: RequestWithUser): Promise<{
        code: HttpStatus;
        success: boolean;
        message: string;
        data: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            comment: string;
            blogId: number;
        };
    } | {
        code: HttpStatus;
        success: boolean;
        message: string;
        data: null;
    }>;
    findAll(dto: FindBlogDto, user: JwtPayload): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        commentCount: number;
        user: {
            userName: string;
        };
        id: number;
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: string;
    }[]>>;
    findAllOur(dto: FindBlogDto, user: JwtPayload): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        commentCount: number;
        user: {
            userName: string;
        };
        id: number;
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: string;
    }[]>>;
    findOne(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        user: {
            userName: string;
        };
        id: number;
        uuid: string;
        createdAt: Date;
        blogComment: {
            user: {
                userName: string;
            };
            createdAt: Date;
            comment: string;
        }[];
        titles: string;
        content: string;
        status: string;
    }>>;
    update(uuid: string, dto: UpdateBlogDto): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: string;
    }>>;
    remove(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: string;
    }>>;
}
