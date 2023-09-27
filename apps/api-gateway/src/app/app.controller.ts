import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async home(): Promise<{ message: string }> {
    return this.appService.home();
  }
}
