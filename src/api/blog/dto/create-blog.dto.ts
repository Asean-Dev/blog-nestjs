import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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

export class CreateBlogCommentDto {
  @IsString()
  @IsNotEmpty()
  blogUuid: string;
  @IsString()
  @IsNotEmpty()
  comment: string;
}

export class FindBlogDto {
  status: string;
}
