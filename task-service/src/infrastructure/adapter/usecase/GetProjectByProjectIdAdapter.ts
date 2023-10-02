import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { GetProjectByProjectIdPort } from '../../../core/domain/port/usecase/GetProjectByProjectIdPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class GetProjectByProjectIdAdapter
  extends UseCaseValidatableAdapter
  implements GetProjectByProjectIdPort
{
  @Expose()
  @IsUUID()
  public id: string;

  public static async new(
    payload: GetProjectByProjectIdPort
  ): Promise<GetProjectByProjectIdAdapter> {
    const adapter: GetProjectByProjectIdAdapter = plainToClass(
      GetProjectByProjectIdAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
