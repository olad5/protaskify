import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

export interface Address {
  email: string;
  name: string;
}
export interface IMail {
  to: Address;
  subject: string;
  body: string;
}

export interface IEmailTransmissionResult {
  message?: string;
  status: boolean;
  recipient?: string;
}

export interface EmailService {
  sendEmail(mail: IMail): Promise<IEmailTransmissionResult>;
}

@Injectable()
export class StubEmailService implements EmailService {
  async sendEmail(mail: IMail): Promise<IEmailTransmissionResult> {
    const successMessage = 'email notification sent successfully';
    Logger.log(successMessage);
    Logger.log(`here is the mail: `, mail);
    return {
      message: successMessage,
      status: true,
      recipient: mail.to.email,
    };
  }
}
