import { Nullable, Optional } from '../../type/CommonTypes';

export class CoreAssert {
  public static throwIfTrue(expression: boolean, exception: Error): void {
    if (expression == true) {
      throw exception;
    }
  }
  public static throwIfFalse(expression: boolean, exception: Error): void {
    if (expression == false) {
      throw exception;
    }
  }

  public static notEmpty<T>(value: Optional<Nullable<T>>, exception: Error): T {
    if (value === null || value === undefined) {
      throw exception;
    }
    return value;
  }
}
