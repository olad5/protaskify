export class UserDITokens {
  // Use-cases

  public static readonly CreateUserUseCase: unique symbol =
    Symbol('CreateUserUseCase');

  // Repositories

  public static readonly UserRepository: unique symbol =
    Symbol('UserRepository');
}
