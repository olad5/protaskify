export class SharedDITokens {
  public static readonly MessageQueue: unique symbol = Symbol('MessageQueue');
  public static readonly RedisCacheModule: unique symbol =
    Symbol('RedisCacheModule');
  public static readonly RabbitMQModule: unique symbol =
    Symbol('RABBIT_MQ_MODULE');
  public static readonly UserServiceAdapter: unique symbol =
    Symbol('UserServiceAdapter');
}
