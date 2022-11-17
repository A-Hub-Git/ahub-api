import {Prisma, Role} from '../prisma';
import {Authorization} from '../Libs';

export default class AuthMiddleware extends Authorization {
  static ArtisanAccess = this.VerifyUserToken([]);
  static PatronAccess = this.VerifyUserToken(['']);
  static ArtisanPatronAccess = this.VerifyUserToken(['']);
  static FullAccess = this.VerifyUserToken([]);
}
