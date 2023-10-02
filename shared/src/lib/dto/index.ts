export * from './user.dto';
export * from './task.dto';

export type CommonResponse = {
  status: boolean;
  code: number;
  message: string;
  timestamp: number;
};

export type DataWithMessage<D> = {
  message: string;
  data: D;
};

export type ResponseWithCommonData<R> = CommonResponse & {
  data: R;
};
