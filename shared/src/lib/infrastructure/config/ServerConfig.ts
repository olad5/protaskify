import { get } from 'env-var';

export class ServerConfig {
  public static readonly RABBITMQ_HOST: string = get('RABBITMQ_HOST')
    .required()
    .asString();

  public static readonly RABBITMQ_QUEUE: string = get('RABBITMQ_QUEUE')
    .required()
    .asString();

  public static readonly LOG_ENABLE: boolean = get('API_LOG_ENABLE')
    .required()
    .asBool();

  public static readonly USER_SERVICE_BASE_URL: string = get(
    'USER_SERVICE_BASE_URL'
  )
    .required()
    .asString();

  public static readonly TASK_SERVICE_BASE_URL: string = get(
    'TASK_SERVICE_BASE_URL'
  )
    .required()
    .asString();
}
