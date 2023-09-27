export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription = {
    code: 200,
    message: 'Success.',
  };

  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: 400,
    message: 'Bad request.',
  };

  public static UNAUTHORIZED_ERROR: CodeDescription = {
    code: 401,
    message: 'Unauthorized error.',
  };

  public static ACCESS_DENIED_ERROR: CodeDescription = {
    code: 403,
    message: 'Access denied.',
  };

  public static CONFLICT_ERROR: CodeDescription = {
    code: 409,
    message: 'Conflict.',
  };

  public static NOT_FOUND_ERROR: CodeDescription = {
    code: 404,
    message: 'Not Found.',
  };

  public static INTERNAL_ERROR: CodeDescription = {
    code: 500,
    message: 'Internal Service error.',
  };
}
