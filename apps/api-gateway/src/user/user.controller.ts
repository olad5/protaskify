import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UserServiceAdapter } from './user.service';
import { CoreApiResponse } from '@protaskify/shared/api/CoreApiResponse';
import {
  HttpRestApiCreateUserBody,
  HttpRestApiLoginUserBody,
} from '@protaskify/shared/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userServiceAdapter: UserServiceAdapter) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  async createUser(
    @Body(ValidationPipe) createUserDto: HttpRestApiCreateUserBody
  ) {
    const result = await this.userServiceAdapter.createUser(createUserDto);
    return CoreApiResponse.success(result.data, result.message);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(
    @Body(ValidationPipe) loginUserDto: HttpRestApiLoginUserBody
  ) {
    const result = await this.userServiceAdapter.loginUser(loginUserDto);
    return CoreApiResponse.success(result.data, result.message);
  }

  @HttpCode(HttpStatus.OK)
  @Get('auth')
  async authenticateUser(@Req() request: Request) {
    const result = await this.userServiceAdapter.authenticateUser(request);
    return CoreApiResponse.success(result.data, result.message);
  }
}
