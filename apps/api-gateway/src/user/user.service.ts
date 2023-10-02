import { Exception } from '@protaskify/shared/exception/Exception';
import { Injectable } from '@nestjs/common';
import { CodeDescription } from '@protaskify/shared/code/Code';
import { CoreAssert } from '@protaskify/shared/util/assert/CoreAssert';
import {
  HttpRestApiAuthenticateUserResponse,
  HttpRestApiCreateUserBody,
  HttpRestApiLoginUserBody,
  HttpRestApiLoginUserResponse,
  ResponseWithCommonData,
  DataWithMessage,
  UserDTO,
} from '@protaskify/shared/dto';
import ServiceAdapter from '@protaskify/shared/adapters/service.adapter';
import { Request } from 'express';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';

@Injectable()
export class UserServiceAdapter {
  client: ServiceAdapter;
  baseUrl: string;

  constructor() {
    this.baseUrl = ServerConfig.USER_SERVICE_BASE_URL;
    this.client = new ServiceAdapter(this.baseUrl, {
      timeout: 20000,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    });
  }

  public async createUser(
    createUserDto: HttpRestApiCreateUserBody
  ): Promise<DataWithMessage<UserDTO>> {
    const url = `${this.baseUrl}/users/`;
    const response = await this.client.post<
      HttpRestApiCreateUserBody,
      ResponseWithCommonData<UserDTO>
    >(url, createUserDto);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      },
    };

    return payload;
  }

  public async loginUser(
    loginUserDto: HttpRestApiLoginUserBody
  ): Promise<DataWithMessage<HttpRestApiLoginUserResponse>> {
    const url = `${this.baseUrl}/users/login`;
    const response = await this.client.post<
      HttpRestApiLoginUserBody,
      ResponseWithCommonData<HttpRestApiLoginUserResponse>
    >(url, loginUserDto);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: {
        id: response.data.id,
        accessToken: response.data.accessToken,
      },
    };

    return payload;
  }
  public async authenticateUser(
    request: Request
  ): Promise<DataWithMessage<HttpRestApiAuthenticateUserResponse>> {
    const url = `${this.baseUrl}/users/auth`;
    const headers = { Authorization: request.headers['authorization'] };

    const response = await this.client.get<
      ResponseWithCommonData<HttpRestApiAuthenticateUserResponse>
    >(url, headers);

    const statusFromAdapter = response.status;
    const code: CodeDescription = {
      code: response.code,
      message: response.message,
    };

    CoreAssert.throwIfFalse(
      statusFromAdapter,
      Exception.new({
        code: code,
        data: response.data,
        overrideMessage: response.message,
      })
    );

    const payload = {
      message: response.message,
      data: {
        id: response.data.id,
      },
    };

    return payload;
  }
}
