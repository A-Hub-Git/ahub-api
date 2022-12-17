import {Request, Response} from 'express';
import ZohoService from '../Services/ZohoService';
import {MailerService} from '../Services';
import BaseRequestHandle from '../Utils/BaseRequestHandle';
import {HTTP_CODES} from '../Utils';
import {UserValidator} from '../Validators';

export default class MailController {
  static async sendUsMail(req: Request, res: Response) {
    await UserValidator.contactUs(req.body, res, async () => {
      try {
        req.body.departmentId = '803113000000006907';
        const mail = await ZohoService.createTicket(req.body);
        BaseRequestHandle.setSuccess(HTTP_CODES.CREATED, 'Mail Sent', mail);
        return BaseRequestHandle.send(res);
      } catch (error: any) {
        BaseRequestHandle.setError(
          HTTP_CODES.INTERNAL_SERVER_ERROR + error,
          `Internal Server Error`
        );
        return BaseRequestHandle.send(res);
      }
    });
  }
}
