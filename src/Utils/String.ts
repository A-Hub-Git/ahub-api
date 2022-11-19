import randomstring from 'randomstring';
export default class String {
  private randomstring;
  constructor() {
    this.randomstring = randomstring.generate;
  }
  static otp() {
    const otp = randomstring.generate({
      length: 4,
      charset: 'number'
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
