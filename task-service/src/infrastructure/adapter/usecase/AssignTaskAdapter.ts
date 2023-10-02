import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { AssignTaskPort } from '../../../core/domain/port/usecase/AssignTaskPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class AssignTaskAdapter
  extends UseCaseValidatableAdapter
  implements AssignTaskPort
{
  @Expose()
  @IsUUID()
  public taskId: string;

  @Expose()
  @IsUUID()
  public assigneeId: string;

  @Expose()
  @IsUUID()
  public projectId: string;

  @Expose()
  @IsUUID()
  public creatorId: string;

  public static async new(payload: AssignTaskPort): Promise<AssignTaskAdapter> {
    const adapter: AssignTaskAdapter = plainToClass(AssignTaskAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
