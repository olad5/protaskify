import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home(): { message: string } {
    return { message: 'User Service running....' };
  }
}
