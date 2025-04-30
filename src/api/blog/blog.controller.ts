import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Request,
  Put,
  Query,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto, FindBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "src/helpers/jwt/jwt.type";

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @Request() req: RequestWithUser
  ) {
    return this.blogService.create(createBlogDto, req);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(@Query() dto: FindBlogDto, @Request() req: RequestWithUser) {
    return this.blogService.findAll(dto, req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":uuid")
  findOne(@Param("uuid") uuid: string) {
    return this.blogService.findOne(uuid);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":uuid")
  update(@Param("uuid") uuid: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(uuid, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":uuid")
  remove(@Param("uuid") uuid: string) {
    return this.blogService.remove(uuid);
  }
}
