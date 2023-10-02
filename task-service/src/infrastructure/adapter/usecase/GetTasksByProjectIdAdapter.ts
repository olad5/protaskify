import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { GetTasksByProjectIdPort } from '../../../core/domain/port/usecase/GetTasksByProjectIdPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class GetTasksByProjectIdAdapter
  extends UseCaseValidatableAdapter
  implements GetTasksByProjectIdPort
{
  @Expose()
  @IsUUID()
  public projectId: string;

  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(
    payload: GetTasksByProjectIdPort
  ): Promise<GetTasksByProjectIdAdapter> {
    const adapter: GetTasksByProjectIdAdapter = plainToClass(
      GetTasksByProjectIdAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
