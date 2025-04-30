import { BlogService } from "./blog.service";
import { CreateBlogDto, FindBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { RequestWithUser } from "src/helpers/jwt/jwt.type";
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
    findAll(dto: FindBlogDto, req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
    }[]>>;
    findOne(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        titles: string;
        content: string;
        status: string;
        createdAt: Date;
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
