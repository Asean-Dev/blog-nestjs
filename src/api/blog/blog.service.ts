import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtPayload, RequestWithUser } from 'src/helpers/jwt/jwt.type';
import { ResponseSuccess } from 'src/helpers/api-response.dto';

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
      },
    });

    return {
      code: HttpStatus.CREATED,
      success: true,
      message: 'success',
      data: result,
    };
  }

  async findAll(user: JwtPayload) {
    const result = await this.prisma.blog.findMany({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
        uuid: true,
        titles: true,
        content: true,
        createdAt: true,
      },
    });

    return ResponseSuccess(result);
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
      },
    });

    if (!result) {
      throw new HttpException('blog already exists', HttpStatus.CONFLICT);
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
      throw new HttpException('blog already exists', HttpStatus.CONFLICT);
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
