export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  RESOURCE_NOT_FOUND = 404,
  UN_PROCESSABLE_ENTITY = 422,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum ResponseMessage {
  OK = 'success',
  CREATED = 'success',
  INTERNAL_SERVER_ERROR = 'Internal Server Error. Contact Support!..'
}

export enum ResponseStatus {
  SUCCESS = 'success',
  FAILURE = 'error'
}

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}

export enum ACL_ROLES {
  ARTISAN = 1,
  PATRON = 2
}
