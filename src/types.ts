import { Administrator, User as APIUser } from "@database";

export type SerializerResponse<ModelType> = {
  [key in keyof Partial<ModelType>]:
    | string
    | number
    | boolean
    | object
    | undefined;
};

export type Serializer<ModelType> = {
  serialize(model: ModelType): SerializerResponse<ModelType>;
};

export type ApiError = {
  title: string;
  description: string;
  status: number;
};

export type ErrorResponse = {
  error: ApiError;
};

export enum Permissions {
  NONE = 0,
  VIEW = 1,
  EDIT = 2,
  DELETE = 4,
}

declare global {
  namespace Express {
    interface User {
      administrator?: Administrator;
      user?: APIUser;
    }
  }
}
