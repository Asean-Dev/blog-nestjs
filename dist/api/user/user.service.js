"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const api_response_dto_1 = require("../../helpers/api-response.dto");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async create(dto) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    userName: dto.userName,
                },
            });
            if (findUser?.id) {
                const payload = {
                    id: findUser.id,
                    uuid: findUser.uuid,
                    userName: findUser.userName,
                };
                return new api_response_dto_1.ApiResponse({
                    code: common_1.HttpStatus.CREATED,
                    success: true,
                    message: 'success',
                    data: { access_token: this.jwtService.sign(payload) },
                });
            }
            const result = await this.prisma.user.create({
                data: {
                    userName: dto.userName,
                },
            });
            const payload = {
                id: result.id,
                uuid: result.uuid,
                userName: result.userName,
            };
            return new api_response_dto_1.ApiResponse({
                code: common_1.HttpStatus.CREATED,
                success: true,
                message: 'success',
                data: { access_token: this.jwtService.sign(payload) },
            });
        }
        catch (error) {
            console.log('error :', error);
            throw new common_1.HttpException('user already exists', common_1.HttpStatus.CONFLICT);
        }
    }
    async findAll(user) {
        const result = await this.prisma.user.findUnique({
            where: {
                id: user.id,
            },
            select: {
                id: true,
                uuid: true,
                userName: true,
                createdAt: true,
                updatedAt: true,
                blog: {
                    select: {
                        id: true,
                        uuid: true,
                        createdAt: true,
                        titles: true,
                        content: true,
                        status: true,
                    },
                },
            },
        });
        return new api_response_dto_1.ApiResponse({
            code: common_1.HttpStatus.CREATED,
            success: true,
            message: 'success',
            data: result,
        });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map