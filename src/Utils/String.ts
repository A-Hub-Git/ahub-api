import randomstring from 'randomstring';
export default class String {
  static otp() {
    const otp = randomstring.generate({
      length: 4,
      charset: 'numeric'
    });
    return otp;
  }
  static artisanId() {
    const id = randomstring.generate({
      length: 5,
      charset: 'number'
    });
    return 'ARTISAN' + id;
  }
}
