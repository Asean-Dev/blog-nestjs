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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const api_response_dto_1 = require("../../helpers/api-response.dto");
let BlogService = class BlogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, req) {
        const user = req.user;
        const result = await this.prisma.blog.create({
            data: {
                titles: dto.titles,
                content: dto.content,
                userId: user.id,
                status: dto.status,
            },
        });
        return {
            code: common_1.HttpStatus.CREATED,
            success: true,
            message: "success",
            data: result,
        };
    }
    async createComment(dto, req) {
        const user = req.user;
        const blog = await this.prisma.blog.findUnique({
            where: {
                uuid: dto.blogUuid,
            },
        });
        if (blog) {
            const result = await this.prisma.blogComment.create({
                data: {
                    userId: user.id,
                    blogId: blog?.id,
                    comment: dto.comment,
                },
            });
            return {
                code: common_1.HttpStatus.CREATED,
                success: true,
                message: "success",
                data: result,
            };
        }
        return {
            code: common_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: "error",
            data: null,
        };
    }
    async findAll(dto, user) {
        console.log("dto", dto);
        const result = await this.prisma.blog.findMany({
            where: {
                ...(dto.status && { status: { contains: dto.status } }),
            },
            select: {
                id: true,
                status: true,
                uuid: true,
                titles: true,
                content: true,
                createdAt: true,
                user: {
                    select: { userName: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const newData = await Promise.all(result.map(async (data) => {
            const countComment = await this.prisma.blogComment.count({
                where: {
                    blogId: data.id,
                },
            });
            return { ...data, commentCount: countComment };
        }));
        return (0, api_response_dto_1.ResponseSuccess)(newData);
    }
    async findAllOur(dto, user) {
        console.log("findAllOur", dto);
        const result = await this.prisma.blog.findMany({
            where: {
                ...(dto.status && { status: { contains: dto.status } }),
                userId: user.id,
            },
            select: {
                id: true,
                status: true,
                uuid: true,
                titles: true,
                content: true,
                createdAt: true,
                user: {
                    select: { userName: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const newData = await Promise.all(result.map(async (data) => {
            const countComment = await this.prisma.blogComment.count({
                where: {
                    blogId: data.id,
                },
            });
            return { ...data, commentCount: countComment };
        }));
        return (0, api_response_dto_1.ResponseSuccess)(newData);
    }
    async findOne(uuid) {
        const result = await this.prisma.blog.findFirst({
            where: {
                uuid: uuid,
            },
            select: {
                id: true,
                uuid: true,
                titles: true,
                content: true,
                createdAt: true,
                status: true,
                user: {
                    select: {
                        userName: true,
                    },
                },
                blogComment: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        createdAt: true,
                        comment: true,
                        user: {
                            select: {
                                userName: true,
                            },
                        },
                    },
                },
            },
        });
        if (!result) {
            throw new common_1.HttpException("blog already exists", common_1.HttpStatus.CONFLICT);
        }
        return (0, api_response_dto_1.ResponseSuccess)(result);
    }
    async update(uuid, dto) {
        const result = await this.prisma.blog.findFirst({
            where: {
                uuid: uuid,
            },
            select: {
                id: true,
                uuid: true,
                titles: true,
                content: true,
                createdAt: true,
                status: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException("blog already exists", common_1.HttpStatus.CONFLICT);
        }
        const updateData = await this.prisma.blog.update({
            where: {
                uuid: uuid,
            },
            data: {
                titles: dto.titles,
                content: dto.content,
            },
        });
        return (0, api_response_dto_1.ResponseSuccess)(updateData);
    }
    async remove(uuid) {
        const result = await this.prisma.blog.delete({
            where: {
                uuid: uuid,
            },
        });
        return (0, api_response_dto_1.ResponseSuccess)(result);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogService);
//# sourceMappingURL=blog.service.js.map