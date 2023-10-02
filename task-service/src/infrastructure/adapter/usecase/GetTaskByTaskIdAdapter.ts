import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { GetTaskByTaskIdPort } from '../../../core/domain/port/usecase/GetTaskByTaskIdPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class GetTaskByTaskIdAdapter
  extends UseCaseValidatableAdapter
  implements GetTaskByTaskIdPort
{
  @Expose()
  @IsUUID()
  public id: string;

  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(
    payload: GetTaskByTaskIdPort
  ): Promise<GetTaskByTaskIdAdapter> {
    const adapter: GetTaskByTaskIdAdapter = plainToClass(
      GetTaskByTaskIdAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
