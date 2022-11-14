import {Response} from 'express';
import {HTTP_CODES, ResponseStatus} from '../Utils';

class BaseRequestHandler {
  protected statusCode: HTTP_CODES;
  protected type: ResponseStatus | null;
  protected data: object | null;
  protected message: string | null;
  constructor() {
    this.statusCode = 200;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode: HTTP_CODES, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = ResponseStatus.SUCCESS;
  }
  setError(statusCode: HTTP_CODES, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = ResponseStatus.FAILURE;
  }
  send(res: Response) {
    let result;
    if (this.type === ResponseStatus.SUCCESS) {
      result = {
        code: this.statusCode,
        status: this.type,
        message: this.message,
        data: this.data
      };
    } else {
      result = {
        code: this.statusCode,
        status: this.type,
        message: this.message
      };
    }

    return res.status(result.code).json(result);
  }
}

export default new BaseRequestHandler();
