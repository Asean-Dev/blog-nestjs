import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  titles: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  status: string;
}
export class FindBlogDto {
  @IsString()
  status: string;
}
