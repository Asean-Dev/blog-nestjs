import { RequestWithUser } from "src/helpers/jwt/jwt.type";
import { BlogService } from "./blog.service";
import { CreateBlogCommentDto, CreateBlogDto, FindBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto, req: RequestWithUser): Promise<{
        code: import("@nestjs/common").HttpStatus;
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
    createComment(createBlogDto: CreateBlogCommentDto, req: RequestWithUser): Promise<{
        code: import("@nestjs/common").HttpStatus;
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
        code: import("@nestjs/common").HttpStatus;
        success: boolean;
        message: string;
        data: null;
    }>;
    findAll(dto: FindBlogDto, req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    findAllOur(dto: FindBlogDto, req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    findOne(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    update(uuid: string, dto: UpdateBlogDto): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        userId: number;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>>;
    remove(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
