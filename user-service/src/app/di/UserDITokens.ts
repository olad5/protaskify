export class UserDITokens {
  // Use-cases

  public static readonly CreateUserUseCase: unique symbol =
    Symbol('CreateUserUseCase');

  public static readonly GetUserByUserIdUseCase: unique symbol = Symbol(
    'GetUserByUserIdUseCase'
  );

  // Repositories

  public static readonly UserRepository: unique symbol =
    Symbol('UserRepository');
}
