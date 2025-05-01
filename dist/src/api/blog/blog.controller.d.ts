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
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            titles: string;
            content: string;
            status: string;
        };
    }>;
    createComment(createBlogDto: CreateBlogCommentDto, req: RequestWithUser): Promise<{
        code: import("@nestjs/common").HttpStatus;
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
        code: import("@nestjs/common").HttpStatus;
        success: boolean;
        message: string;
        data: null;
    }>;
    findAll(dto: FindBlogDto, req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    findAllOur(dto: FindBlogDto, req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    findOne(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
    update(uuid: string, dto: UpdateBlogDto): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: string;
    }>>;
    remove(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
