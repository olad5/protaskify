import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { CreateProjectPort } from '../../../core/domain/port/usecase/CreateProjectPort';
import { UseCaseValidatableAdapter } from '@protaskify/shared/usecase/UseCaseValidatableAdapter';

@Exclude()
export class CreateProjectAdapter
  extends UseCaseValidatableAdapter
  implements CreateProjectPort
{
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public description: string;

  @Expose()
  @IsUUID()
  public creatorId: string;

  public static async new(
    payload: CreateProjectPort
  ): Promise<CreateProjectAdapter> {
    const adapter: CreateProjectAdapter = plainToClass(
      CreateProjectAdapter,
      payload
    );
    await adapter.validate();

    return adapter;
  }
}
