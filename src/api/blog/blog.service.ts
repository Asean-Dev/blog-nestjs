import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ResponseSuccess } from "src/helpers/api-response.dto";
import { JwtPayload, RequestWithUser } from "src/helpers/jwt/jwt.type";
import {
  CreateBlogCommentDto,
  CreateBlogDto,
  FindBlogDto,
} from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBlogDto, req: RequestWithUser) {
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
      code: HttpStatus.CREATED,
      success: true,
      message: "success",
      data: result,
    };
  }
  async createComment(dto: CreateBlogCommentDto, req: RequestWithUser) {
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
        code: HttpStatus.CREATED,
        success: true,
        message: "success",
        data: result,
      };
    }

    return {
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: "error",
      data: null,
    };
  }

  async findAll(dto: FindBlogDto, user: JwtPayload) {
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

    const newData = await Promise.all(
      result.map(async (data) => {
        const countComment = await this.prisma.blogComment.count({
          where: {
            blogId: data.id,
          },
        });
        return { ...data, commentCount: countComment };
      })
    );

    return ResponseSuccess(newData);
  }

  async findAllOur(dto: FindBlogDto, user: JwtPayload) {
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

    const newData = await Promise.all(
      result.map(async (data) => {
        const countComment = await this.prisma.blogComment.count({
          where: {
            blogId: data.id,
          },
        });
        return { ...data, commentCount: countComment };
      })
    );

    return ResponseSuccess(newData);
  }

  async findOne(uuid: string) {
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
      throw new HttpException("blog already exists", HttpStatus.CONFLICT);
    }

    return ResponseSuccess(result);
  }

  async update(uuid: string, dto: UpdateBlogDto) {
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
      throw new HttpException("blog already exists", HttpStatus.CONFLICT);
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
    return ResponseSuccess(updateData);
  }

  async remove(uuid: string) {
    const result = await this.prisma.blog.delete({
      where: {
        uuid: uuid,
      },
    });
    return ResponseSuccess(result);
  }
}
