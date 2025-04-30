import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/helpers/jwt/jwt.type';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  findAll(@Request() req: RequestWithUser) {
    return this.userService.findAll(req.user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
