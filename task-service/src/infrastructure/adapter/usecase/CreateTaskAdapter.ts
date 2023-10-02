import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { CreateTaskPort } from '../../../core/domain/port/usecase/CreateTaskPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class CreateTaskAdapter
  extends UseCaseValidatableAdapter
  implements CreateTaskPort
{
  @Expose()
  @IsString()
  public title: string;

  @Expose()
  @IsString()
  public description: string;

  @Expose()
  @IsString()
  public dueDate: string;

  @Expose()
  @IsUUID()
  public creatorId: string;

  @Expose()
  @IsUUID()
  public projectId: string;

  public static async new(payload: CreateTaskPort): Promise<CreateTaskAdapter> {
    const adapter: CreateTaskAdapter = plainToClass(CreateTaskAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
