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
            userId: number;
            titles: string;
            content: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    createComment(dto: CreateBlogCommentDto, req: RequestWithUser): Promise<{
        code: HttpStatus;
        success: boolean;
        message: string;
        data: {
            id: number;
            uuid: string;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            blogId: number;
            comment: string;
        };
    } | {
        code: HttpStatus;
        success: boolean;
        message: string;
        data: null;
    }>;
    findAll(dto: FindBlogDto): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        commentCount: number;
        id: number;
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        user: {
            userName: string;
        };
    }[]>>;
    findAllOur(dto: FindBlogDto, user: JwtPayload): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        commentCount: number;
        id: number;
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        user: {
            userName: string;
        };
    }[]>>;
    findOne(uuid: string): Promise<import("src/helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        user: {
            userName: string;
        };
        blogComment: {
            createdAt: Date;
            user: {
                userName: string;
            };
            comment: string;
        }[];
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
