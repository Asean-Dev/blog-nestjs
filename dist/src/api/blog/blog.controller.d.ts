import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { RequestWithUser } from 'src/helpers/jwt/jwt.type';
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
            status: import(".prisma/client").$Enums.BlogStatus;
        };
    }>;
    findAll(req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }[]>>;
    findOne(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }>>;
    update(uuid: string, dto: UpdateBlogDto): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        titles: string;
        content: string;
        status: import(".prisma/client").$Enums.BlogStatus;
    }>>;
    remove(uuid: string): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
