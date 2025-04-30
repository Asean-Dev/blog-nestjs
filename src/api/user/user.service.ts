import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse, ResponseSuccess } from 'src/helpers/api-response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/helpers/jwt/jwt.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
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
        return new ApiResponse({
          code: HttpStatus.CREATED,
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
      return new ApiResponse({
        code: HttpStatus.CREATED,
        success: true,
        message: 'success',
        data: { access_token: this.jwtService.sign(payload) },
      });
    } catch (error) {
      console.log('error :', error);
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
  }

  async findAll(user: JwtPayload) {
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
    return new ApiResponse({
      code: HttpStatus.CREATED,
      success: true,
      message: 'success',
      data: result,
    });
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
