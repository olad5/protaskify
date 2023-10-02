import { Injectable } from '@nestjs/common';
import {
  ResponseWithCommonData,
  DataWithMessage,
  UserDTO,
} from '@protaskify/shared/dto';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';
import ServiceAdapter from './service.adapter';

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

  public async getUserbyUserId(
    userId: string
  ): Promise<DataWithMessage<UserDTO> & { status: boolean }> {
    const url = `${this.baseUrl}/users/${userId}`;

    const response = await this.client.get<ResponseWithCommonData<UserDTO>>(
      url
    );

    if (response.status == false) {
      return {
        status: false,
        message: response.message,
        data: undefined,
      };
    }

    const payload = {
      message: response.message,
      status: response.status,
      data: response.data,
    };

    return payload;
  }
}
