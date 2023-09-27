export type CommonResponse = {
  status: boolean;
  code: number;
  message: string;
  timestamp: number;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type HttpRestApiCreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type HttpRestApiLoginUserBody = {
  email: string;
  password: string;
};

export type HttpRestApiLoginUserResponse = {
  id: string;
  accessToken: string;
};

export type HttpRestApiAuthenticateUserResponse = {
  id: string;
};
