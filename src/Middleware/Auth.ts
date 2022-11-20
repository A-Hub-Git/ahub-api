import Authorization from '../Authorization/Authorization';
import {ACL_ROLES} from '../Utils';

const {ARTISAN, PATRON} = ACL_ROLES;
export default class AuthMiddleware extends Authorization {
  static ArtisanAccess = this.VerifyUserToken([ARTISAN]);
  static PatronAccess = this.VerifyUserToken([PATRON]);
  static ArtisanPatronAccess = this.VerifyUserToken([ARTISAN, PATRON]);
  static FullAccess = this.VerifyUserToken([ARTISAN, PATRON]);
}
