import { compare, genSalt, hash } from 'bcryptjs';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { v4 } from 'uuid';
import { CreateUserEntityPayload } from './type/CreateUserEntityPayload';
import { Entity } from '@protaskify/shared/entity/Entity';

export class User extends Entity<string> {
  @IsString()
  private firstName: string;

  @IsString()
  private lastName: string;

  @IsEmail()
  private readonly email: string;

  @IsString()
  private password: string;

  @IsDate()
  private readonly createdAt: Date;

  constructor(payload: CreateUserEntityPayload) {
    super();

    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.password = payload.password;
    this.id = payload.id || v4();
    this.createdAt = payload.createdAt || new Date();
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user: User = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }
}
