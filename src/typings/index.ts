export interface IRole {
  id: string;
  name: 'Patron' | 'Artisan';
  description: string;
  userId: IUser;
}
enum VERIFICATION_TYPE {
  NIN = 'NIN',
  DRIVER_LICENSE = 'Driver-License'
}
export interface IUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  password: string | null;
  gender: string;
  verification_type: VERIFICATION_TYPE;
  isVerified: Boolean;
  dob: Date;
  location: Object;
  artisanId: string;
  roleId: string;
}
