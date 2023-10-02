import { Code } from '../code/Code';
import { Nullable } from '../type/CommonTypes';

export class CoreApiResponse<TData> {
  public readonly status: boolean;
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;
  public readonly stackTrace: string;

  private constructor(
    status: boolean,
    code: number,
    message: string,
    data?: TData,
    stackTrace?: string
  ) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
    this.stackTrace = stackTrace;
    this.timestamp = Date.now();
  }

  public static success<TData>(
    data?: TData,
    message?: string,
    status: true = true
  ): CoreApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreApiResponse(status, resultCode, resultMessage, data);
  }

  public static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
    stackTrace?: string,
    status: false = false
  ): CoreApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(
      status,
      resultCode,
      resultMessage,
      data,
      stackTrace
    );
  }
}
