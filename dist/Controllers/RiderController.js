"use strict";
// import PubNubService from '../Services/WorkerSimulation';
// import {Request, Response} from 'express';
// import {HTTP_CODES, ResponseMessage, BaseRequestHandle} from '../Utils';
// export default class RiderController {
//   static async sendMessage(req: Request, res: Response) {
//     const user = req.user.id;
//     try {
//       const onMessage = new PubNubService(user);
//       const send = await onMessage
//         .eventListener()
//         .then(() => onMessage.start());
//       BaseRequestHandle.setSuccess(HTTP_CODES.OK, 'Message Initiated', send);
//       return BaseRequestHandle.send(res);
//     } catch (error) {
//       BaseRequestHandle.setError(
//         HTTP_CODES.INTERNAL_SERVER_ERROR,
//         ResponseMessage.INTERNAL_SERVER_ERROR
//       );
//       return BaseRequestHandle.send(res);
//     }
//   }
// }
//# sourceMappingURL=RiderController.js.map