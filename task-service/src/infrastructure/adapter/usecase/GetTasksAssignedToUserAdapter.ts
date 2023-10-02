import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { GetTasksAssignedToUserPort } from '../../../core/domain/port/usecase/GetTasksAssignedToUserPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class GetTasksAssignedToUserAdapter
  extends UseCaseValidatableAdapter
  implements GetTasksAssignedToUserPort
{
  @Expose()
  @IsUUID()
  public userId: string;

  public static async new(
    payload: GetTasksAssignedToUserPort
  ): Promise<GetTasksAssignedToUserAdapter> {
    const adapter: GetTasksAssignedToUserAdapter = plainToClass(
      GetTasksAssignedToUserAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
