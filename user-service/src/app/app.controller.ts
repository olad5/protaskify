import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoreApiResponse } from '@protaskify/shared/api/CoreApiResponse';
import {
  UserDTO,
  HttpRestApiCreateUserBody,
  HttpRestApiLoginUserResponse,
  HttpRestApiAuthenticateUserResponse,
} from '@protaskify/shared/dto/';
import { CreateUserUseCase } from '../core/domain/usecase/CreateUserUseCase';
import { UserDITokens } from './di/UserDITokens';
import { CreateUserAdapter } from '../infrastructure/adapter/usecase/CreateUserAdapter';
import { ToUserDTO } from '../core/domain/mapper/DTOMapper';
import { HttpLocalAuthGuard } from '../core/service/auth/passport/guard/HttpLocalAuthGuard';
import { HttpRequestWithUser } from '../core/service/auth/type/HttpAuthTypes';
import { HttpAuthService } from '../core/service/auth/HttpAuthService';
import { HttpJwtAuthGuard } from '../core/service/auth/passport/guard/HttpJwtAuthGuard';
import { AppService } from './app.service';
import { GetUserByUserIdUseCase } from '../core/domain/usecase/GetUserByIdUseCase';
import { GetUserByUserIdAdapter } from '../infrastructure/adapter/usecase/GetUserByUserIdAdapter';

@Controller('users')
export class AppController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UserDITokens.GetUserByUserIdUseCase)
    private readonly getUserByUserIdUseCase: GetUserByUserIdUseCase,
    private readonly authService: HttpAuthService,
    private readonly appService: AppService
  ) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  public async home(): Promise<{ message: string }> {
    return this.appService.home();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async createAccount(
    @Body() body: HttpRestApiCreateUserBody
  ): Promise<CoreApiResponse<UserDTO>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });
    const createdUser = await this.createUserUseCase.execute(adapter);
    return CoreApiResponse.success<UserDTO>(ToUserDTO(createdUser));
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpLocalAuthGuard)
  public async login(
    @Req() request: HttpRequestWithUser
  ): Promise<CoreApiResponse<HttpRestApiLoginUserResponse>> {
    return CoreApiResponse.success(this.authService.login(request.user));
  }

  @Get('auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpJwtAuthGuard)
  public async authenticateUser(
    @Req() request: HttpRequestWithUser
  ): Promise<CoreApiResponse<HttpRestApiAuthenticateUserResponse>> {
    const result = {
      id: request.user.id,
    };

    return CoreApiResponse.success(result, 'user authenticated successfully');
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  public async getUserById(
    @Param('userId') userId: string
  ): Promise<CoreApiResponse<UserDTO>> {
    const adapter = await GetUserByUserIdAdapter.new({
      userId,
    });
    const user = await this.getUserByUserIdUseCase.execute(adapter);
    return CoreApiResponse.success<UserDTO>(ToUserDTO(user));
  }
}
