import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { GetUserByUserIdPort } from '../../../core/domain/port/usecase/GetUserByUserIdPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class GetUserByUserIdAdapter
  extends UseCaseValidatableAdapter
  implements GetUserByUserIdPort
{
  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(
    payload: GetUserByUserIdPort
  ): Promise<GetUserByUserIdAdapter> {
    const adapter: GetUserByUserIdAdapter = plainToClass(
      GetUserByUserIdAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
