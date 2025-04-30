import { RequestWithUser } from "src/helpers/jwt/jwt.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../../helpers/api-response.dto").ApiResponse<{
        access_token: string;
    }>>;
    findAll(req: RequestWithUser): Promise<import("../../helpers/api-response.dto").ApiResponse<{
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
}
