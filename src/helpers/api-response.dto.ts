// src/common/dto/api-response.dto.ts
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }
}

export const ResponseSuccess = <T>(data: T): ApiResponse<T> => {
  return new ApiResponse<T>({
    code: HttpStatus.CREATED,
    success: true,
    message: 'success',
    data: data,
  });
};
