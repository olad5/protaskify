import { Code } from '../code/Code';
import { Exception } from '../exception/Exception';
import { Optional } from '../type/CommonTypes';
import {
  ClassValidationDetails,
  ClassValidator,
} from '../util/class-validator/ClassValidator';

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        data: details,
      });
    }
  }
}
